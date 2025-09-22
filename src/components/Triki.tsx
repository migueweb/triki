import { useTriki } from "../hooks/useTriki";
import type { SquareProps } from "../types/triki";

export default function Triki() {
  const { player, trikiStructure, handleClick, handleRestartGame } = useTriki();

  return (
    <>
      <h1>Triki</h1>

      <div className="turn">
        <span>Player: &nbsp;</span> {player}
      </div>

      <section className="triki">
        {trikiStructure.map((square) => (
          <Square
            key={`square-${square.position}`}
            onClick={() => handleClick(square.position)}
            content={square.content}
            position={square.position}
            className={square.className}
          />
        ))}
      </section>

      <button className="restart-game-btn" onClick={handleRestartGame}>
        Restart game
      </button>
    </>
  );
}

function Square({ onClick, content, position, className }: SquareProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      value={position}
      className={className}
    >
      {content}
    </button>
  );
}