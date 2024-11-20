import { BrowserRouter, Route, Routes } from 'react-router-dom'

//pages
import { RockPaperScissors } from './RockPaperScissors'
import { SealBreaker } from './SealBreaker'
import { TicTacToe } from './TicTacToe'

export function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<RockPaperScissors />} />
        <Route path={'/rock-paper-scissors'} element={<RockPaperScissors />} />
        <Route path={'/seal-breaker'} element={<SealBreaker />} />
        <Route path={'/tic-tac-toe'} element={<TicTacToe />} />
      </Routes>
    </BrowserRouter>
  )
}
