import { useEffect, useState } from 'react'
import './App.css'

import {
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Resume from './pages/Resume';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="resume/:id" element={<Resume/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
