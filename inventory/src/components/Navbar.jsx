import React, { useState } from 'react'
import {FaBars , FaTimes} from "react-icons/fa"


const Navbar = () => {

    const [nav, setNav] = useState(false)

    const viewPage = (link) => {
        console.log(link.url)
        window.open(link.url, "_self",'noopener', 'noreferrer');
      }
    

    const links = [
        {   id : 1,
            link: "Dashboard",
            url: "/dashboard"
        },
        {   id : 2,
            link: "View Inventory",
            url: "/view"
        },
        {   id : 3,
            link: "Add Items",
            url: "/add"
        }
    ]



  return (
    <div className='flex items-center justify-between 
    h-20 w-screen px-4 z-10 top-0 text-white sticky bg-black'>
            <h1 className="text-5xl mt-0.3 ml-1"> InvBuddy </h1>

        <ul className='hidden md:hidden sm:hidden lg:flex md:text-xl'>
            {links.map(({id, link, url}) => (
                <li key={id} onClick={()=> (viewPage({url}))} className='px-4 py-7 cursor-pointer hover:scale-105 h-20 w-auto align-middle hover:bg-emerald-400 duration-200 hover:text-black text-white'>{link}</li>
            ))}
        </ul>

        <div onClick={()=> setNav(!nav)} className='cursor-pointer pr-4 z-10 text-gray-500 lg:hidden'>
            {nav ? <FaTimes size={30}/> : <FaBars size={30} />}
        </div>

        {nav && (
            <ul className='flex flex-col justify-center items-center absolute bg-white top-0 left-0 w-full h-screen text-white'>
            {links.map(({id, link, url}) => (
                <li key={id} onClick={()=> (viewPage({url}))} className='bg-slate-800 rounded-2xl lg:w-96 w-80 cursor-pointer py-5 my-6 px-4 text-xl text-center hover:scale-110 duration-200'>{link}</li>
            ))}
        </ul>

        )}

        


    </div>
  )
}

export default Navbar;