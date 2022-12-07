import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewInv from './components/ViewInv';
import AddItems from './components/AddItems';
import EditItems from './components/EditItems';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Sales from './components/Sales';

function App() {

  

  return (
    <Router>
    <div className='font-textMont bg-fixed w-screen h-screen bg-repeat bg-backg'>
    <div className='h-screen w-screen backdrop-blur-lg'>
    {<Navbar />}
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/view' element={<ViewInv />}/>
        <Route path='/add' element={<AddItems />}/>
        <Route path='/edit' element={<EditItems />}/>
        <Route path='/sale' element={<Sales />}/>
      </Routes>
    </div>
    </div>
    </Router>
  )
  }

export default App