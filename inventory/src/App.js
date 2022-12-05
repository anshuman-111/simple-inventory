import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewInv from './components/ViewInv';
import AddItems from './components/AddItems';
import EditItems from './components/EditItems';
import Navbar from './components/Navbar';

function App() {

  

  return (
    <Router>
    <div className='font-textMont bg-fixed h-auto bg-auto bg-backg backdrop-blur-lg'>
    <div className='flex flex-col h-screen items-center backdrop-blur-lg'>
    {<Navbar />}
      <Routes>
        <Route path='/' element={<ViewInv />}/>
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