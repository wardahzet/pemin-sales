import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AnalisisPage from './Page/AnalisisPage/AnalisisPage'
import CobaPage from './Page/CobaPage'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/home' Component={AnalisisPage}/>
        <Route path='/analisis' Component={AnalisisPage}/>
        <Route path='/' Component={CobaPage}/>
      </Routes>
    </Router>
  )
}

export default App
