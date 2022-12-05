import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewInv from './components/ViewInv';
import AddItems from './components/AddItems';
import EditItems from './components/EditItems';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {

  

  return (
    <Router>
    <div className='font-textMont bg-fixed h-auto bg-auto bg-backg backdrop-blur-lg'>
    <div className='flex flex-col h-screen w-full items-center backdrop-blur-lg'>
    {<Navbar />}
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/view' element={<ViewInv />}/>
        <Route path='/add' element={<AddItems />}/>
        <Route path='/edit' element={<EditItems />}/>
      </Routes>
    </div>
    </div>
    </Router>
  )
  }

export default App