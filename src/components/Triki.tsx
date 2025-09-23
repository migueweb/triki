import { useTriki } from "../hooks/useTriki";
import type { SquareProps } from "../types/triki";

export default function Triki() {
  const { player, trikiStructure, handleClick, handleRestartGame } = useTriki();

  return (
    <main className="flex justify-center items-center flex-col h-screen w-full gap-4">
      <h1 className="text-5xl font-bold">Triki</h1>

      <div>
        <span className="font-bold">Player: &nbsp;</span> {player}
      </div>

      <div className="relative w-fit">
        <section className="grid grid-cols-3 gap-3 w-fit">
          {trikiStructure.map((square) => (
            <Square
            key={`square-${square.position}`}
            onClick={() => handleClick(square.position)}
            content={square.content}
            position={square.position}
            className={square.className+" z-10"}
            />
          ))}
        </section>
        <div className="absolute bg-radial from-blue-400/20 from-5% via-blue-400/0 via-60% to-transparent top-0 rounded-full h-full w-full scale-200 -z-10"></div>
      </div>

      <button className="bg-gray-400/10 px-4 py-2 backdrop-blur-sm hover:bg-gray-400/20 duration-300 border border-zinc-50/10" onClick={handleRestartGame}>
        Restart game
      </button>
    </main>
  );
}

function Square({ onClick, content, position, className }: SquareProps) {
  const styles:string = `bg-gray-400/10 h-32 w-32 p-0 backdrop-blur-sm hover:bg-gray-400/20 duration-300 border border-zinc-50/10 text-4xl text-white`;
  return (
    <button
      type="button"
      onClick={onClick}
      value={position}
      className={styles+" "+className}
    >
      {content}
    </button>
  );
}