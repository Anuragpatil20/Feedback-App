import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feedback from './Component/Feedback'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='' element = {<Feedback/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App