import { BrowserRouter, Route, Routes } from 'react-router-dom'

//pages
import { App } from './index'
import { RockPaperScissors } from './RockPaperScissors'
import { SealBreaker } from './SealBreaker'
import { TicTacToe } from './TicTacToe'
import { ToDoApp } from './ToDoApp'
import { Snake } from './Snake'
import { Checkers } from './Checkers'

export function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'/rock-paper-scissors'} element={<RockPaperScissors />} />
        <Route path={'/seal-breaker'} element={<SealBreaker />} />
        <Route path={'/tic-tac-toe'} element={<TicTacToe />} />
        <Route path={'/snake'} element={<Snake />} />
        <Route path={'/todoapp'} element={<ToDoApp />} />
        <Route path={'/checkers'} element={<Checkers />} />
      </Routes>
    </BrowserRouter>
  )
}
