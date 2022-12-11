import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewInv from './components/ViewInv';
import AddItems from './components/AddItems';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';


function App() {

  

  return (
    <Router>
    <div className='font-textMont fixed w-screen overflow-auto h-screen bg-stone-800'>
    {<Navbar />}
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/view' element={<ViewInv />}/>
        <Route path='/add' element={<AddItems />}/>
      </Routes>
    </div>
    </Router>
  )
  }

export default App