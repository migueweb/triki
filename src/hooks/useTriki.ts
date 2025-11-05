import { useState } from "react";
import checkWinner from "../utils/checkWinner";
import { createTrikiStructure } from "../utils/createTrikiStructure";
import type { TrikiInfo } from "../types/triki";

/**
 * Custom hook that encapsulates the core game logic for a Tic-Tac-Toe ("Triki") board.
 * 
 * Design decisions:
 * - Game state is fully controlled here (player, board, and gameOver flag) so the UI remains 
 *   a pure function of state. This avoids spreading business rules across components.
 * - The hook returns only what the UI needs (state + handlers), keeping the API surface small
 *   and making it easier to test or swap logic later.
 * - We keep player markers ("X" and "O") as constants to prevent hard-coded strings leaking 
 *   across the app, which improves maintainability if rules or symbols change.
 */
export function useTriki() {
  const PLAYER_ONE = "X";
  const PLAYER_TWO = "O";

  // The current player is tracked so the UI can render whose turn it is
  const [player, setPlayer] = useState<string>(PLAYER_ONE);
  
  // We explicitly track if the game is over to short-circuit moves and avoid
  // unnecessary board updates once a winner has been decided
  const [gameOver, setGameOver] = useState(false);
  
  // The board is initialized with a helper function to ensure the same starting
  // state is reused consistently and avoid duplicating initialization logic
  const [trikiStructure, setTrikiStructure] = useState<TrikiInfo[]>(
    createTrikiStructure()
  );

  /**
   * Handles the logic for a single square being clicked.
   * 
   * Why this approach:
   * - We exit early if the game is over or the square is already filled. 
   *   This prevents invalid moves without bloating the main logic path.
   * - The board is rebuilt immutably using array slicing. This ensures React
   *   correctly detects state changes and avoids subtle bugs caused by mutating 
   *   existing objects in place.
   * - After updating the board, we immediately switch the current player to 
   *   keep turn-based logic centralized here rather than spread in the UI.
   * - When a winner is found, we flag the game as over and highlight the winning 
   *   line by assigning different CSS classes. This is done in the data layer 
   *   (state), not the UI, so styling logic remains driven by state alone.
   */
  function handleClick(position: number) {
    if (gameOver) return;

    if (trikiStructure[position - 1].content !== "") return;

    const updatedSquare: TrikiInfo = { content: player, position };
    const index = position - 1;

    const updatedStructure = [
      ...trikiStructure.slice(0, index),
      updatedSquare,
      ...trikiStructure.slice(index + 1),
    ];

    setTrikiStructure(updatedStructure);
    setPlayer(player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE);

    const winner = checkWinner(updatedStructure);
    if (!winner) return;

    setGameOver(true);

    // Each winning square gets a numbered success class so CSS can
    // apply differentiated styles (e.g., animation order).
    const highlighted = updatedStructure.map((square) => {
      const index = winner.indexOf(square.position - 1);
      if (index !== -1) {
        return { ...square, className: `btn-success-${index + 1}` };
      }
      return square;
    });

    setTrikiStructure(highlighted);
  }

  /**
   * Resets the game to its original state.
   * 
   * Why this approach:
   * - We explicitly reset each piece of state (board, current player, gameOver).
   *   This guarantees no "leaked" state persists between matches, making
   *   gameplay predictable and avoiding accidental carry-over bugs.
   */
  function handleRestartGame() {
    setGameOver(false);
    setTrikiStructure(createTrikiStructure());
    setPlayer(PLAYER_ONE);
  }

  return {
    player,
    trikiStructure,
    handleClick,
    handleRestartGame,
  };
}