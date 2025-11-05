import type { TrikiInfo } from "../types/triki";


/**
 * Determines whether there is a winner in the current board state.
 *
 * Design decisions:
 * - The function operates purely on input (`game`) and returns a simple result (array of indices or null).
 *   This makes it a pure function, easy to test and reuse without side effects.
 * - Indices are returned instead of player symbols. Returning positions keeps presentation concerns 
 *   (highlighting, styling, etc.) separate from game logic.
 * - The check order (horizontal → vertical → diagonal) is arbitrary but consistent. 
 *   It guarantees that the first winning condition found is returned immediately, 
 *   avoiding unnecessary iterations and making the function efficient.
 * - Each condition explicitly ignores empty squares (`content !== ""`) to prevent 
 *   false positives where unplayed cells might align.
 */
export default function checkWinner(game: TrikiInfo[]): number[] | null {
  // Horizontal checks (rows)
  for (let i = 0; i < 9; i += 3) {
    if (
      game[i].content !== "" &&
      game[i].content === game[i + 1].content &&
      game[i].content === game[i + 2].content
    ) {
      return [i, i + 1, i + 2];
    }
  }

  // Vertical checks (columns)
  for (let i = 0; i < 3; i++) {
    if (
      game[i].content !== "" &&
      game[i].content === game[i + 3].content &&
      game[i].content === game[i + 6].content
    ) {
      return [i, i + 3, i + 6];
    }
  }

  // Diagonal (top-left → bottom-right)
  if (
    game[0].content !== "" &&
    game[0].content === game[4].content &&
    game[0].content === game[8].content
  ) {
    return [0, 4, 8];
  }

  // Diagonal (top-right → bottom-left)
  if (
    game[2].content !== "" &&
    game[2].content === game[4].content &&
    game[2].content === game[6].content
  ) {
    return [2, 4, 6];
  }

  // No winner found
  return null;
}
