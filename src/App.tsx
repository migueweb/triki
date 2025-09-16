import './App.css'
import { useState } from 'react'

interface trikiInfo {
  content: string,
  position: number,
  className?: string
}

function App() {
  const playerOne:string = "X";
  const playerTwo:string = "O";
  const [gameOver, setGameOver] = useState(false)

  const trikiBaseStructure: Array<trikiInfo>  = createTrikiStructure()

  const [player, setPlayer] = useState(playerOne)


  const [trikiStructure, setTrikiStructure] = useState(trikiBaseStructure)


  function handleClick(position: number) {

    if (gameOver) return

    if (trikiStructure[position-1].content !== "") {
      return
    }

    const squareUpdated:trikiInfo = {content:player, position: position}
    
    position = position - 1    
    
    const trikiStructureUpdated: trikiInfo[] = [
      ...trikiStructure.slice(0, position), 
      squareUpdated, 
      ...trikiStructure.slice(position+1)
    ]

    setPlayer(player === playerOne ? playerTwo : playerOne);
    
    setTrikiStructure(trikiStructureUpdated);

    const winner: number[] | null = checkWinner(trikiStructureUpdated)
    if (!winner) {
      return
    }

    // when the game is over
    setGameOver(true)
    
    const trikiStructuredUpdatedForWinner = trikiStructureUpdated.map((square:trikiInfo) => {
      for (let i:number = 0; i < winner.length; i++) {
        if (winner[i] === square.position-1) {
          square.className = `btn-success-${i+1}`
        }
      }
      return square
    })
    setTrikiStructure(trikiStructuredUpdatedForWinner)
  }

  function handleRestartGame(){
    setGameOver(false)
    setTrikiStructure(createTrikiStructure())
    setPlayer(playerOne)
  }
  
  return (
    <>
      <h1>Triki</h1>
      <div className='turn'>
        <span>Player: &nbsp;</span> {player}
      </div>
      <section className='triki'>

        {
          trikiStructure.map((square:trikiInfo)=>{
            const position = square.position
            return (
              <Square 
                onClick={()=>handleClick(position)} 
                content={square.content} 
                position={position} 
                key={`square-${position}`}
                className={square.className}
              />
            )
          })
        }       

      </section>

      <button className='restart-game-btn' onClick={handleRestartGame}>Restart game</button>
    </>
  )
}

function checkWinner(game: trikiInfo[]): number[] | null {
  // Check horizontal winner
  for (let i:number = 0; i < 9 ; i += 3) {
      if (game[i].content !== "" && game[i].content === game[i+1].content && game[i].content === game[i+2].content ) {
        console.log(game[i], "Horizontal Wins");
        return [i, i+1, i+2]
      }
  }

  // Check vertical winner
  for (let i:number = 0; i < 3 ; i++) {
    if (game[i].content !== "" && game[i].content === game[i+3].content && game[i].content === game[i+6].content ) {
      console.log(game[i], "Vertical Wins");
      return [i, i+3, i+6]
    }
  }

  // Check Diagonal 1 winner
  if(game[0].content !== "" && game[0].content === game[4].content && game[0].content === game[8].content ) {
    console.log(game[0], "Diagonal 1 Wins");
      return [0,4,8]
  }

  // Check Diagonal 2 winner
  if(game[2].content !== "" && game[2].content === game[4].content && game[2].content === game[6].content ) {
    console.log(game[0], "Diagonal 2 Wins");
      return [2,4,6]
  }

  return null

}

function createTrikiStructure(): Array<trikiInfo> {

  const trikiBaseStructure: Array<trikiInfo>  = []

  // Populate the initial triki array
  for (let i:number = 1; i <= 9; i++) {
      trikiBaseStructure.push({content: "", position: i})
  }

  return trikiBaseStructure

}

type squareProps = { 
  onClick: () => void, 
  content: string, 
  position: number, 
  className?: string 
}

function Square({onClick, content, position, className}: squareProps) {
  return (
    <button type="button" onClick={onClick} value={position} className={className}>{content}</button>
  )
}

export default App
