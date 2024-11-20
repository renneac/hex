/** @jsxImportSource @emotion/react */
import { RoutesList } from './Routes'
import ReactDOM from 'react-dom/client'

export const App = () => {
  return <RoutesList />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
