import React, { useState } from 'react'

const EditItems = () => {
  const status = "Item found"
  const [showModal, setShowModal] = useState(false);

  const inputFields = [{
    id: 1,
    labelFor: "item-name", 
    labText: "ITEM NAME: ",
    inpType: "text"
  },
  {
    id: 2,
    labelFor: "item-id", 
    labText: "ITEM ID: ",
    inpType: "number"
  }]

  

  const showData = [{
    id: 1,
    labelFor: "item-name", 
    labText: "ITEM NAME: ",
    inpType: "text",
    fetchedData: " from server"
  },
  {
    id: 2,
    labelFor: "qty", 
    labText: "QUANTITY: ",
    inpType: "number",
    fetchedData: " from server"
  },
  {
    id: 3,
    labelFor: "pur-price", 
    labText: "PURCHASE PRICE: ",
    inpType: "number",
    fetchedData: " from server"
  },
  {
    id: 4,
    labelFor: "pur-price", 
    labText: "PURCHASE DATE: ",
    inpType: "date",
    fetchedData: " from server"
  },
  {
    id: 5,
    labelFor: "sell-date",
    labText: "DATE OF SALE: ",
    inptType: "date",
    fetchedData: " from server"
  },
  {
    id: 6,
    labelFor: "sell-price",
    labText: "SELLING PRICE: ",
    inptType: "number",
    fetchedData: " from server"
  },
]



  return (
    <div>
      <div>
      <h1 className=' text-center text-lg sm:text-2xl md:text-3xl py-5 mb-3 mx-auto w-96 mt-20 text-black bg-white rounded-b-3xl'> EDIT ITEM </h1>
      </div>
        <form className='flex flex-col items-center bg-white rounded-2xl p-5'>
          {inputFields.map(({id, labelFor, labText, inpType}) => 
          (
            <>
            <label className='text-md md:text-lg lg:text-2xl' key={id} htmlFor={labelFor}> {labText} </label>
            <input required className=' m-3 p-2 bg-slate-300 rounded-md sm:w-auto md:w-96 w-48 border-4 border-black' type={inpType} name={labelFor} id={labelFor} />
            </>
          ))}
          <button type="submit" value="ADD ITEM" onClick={()=>setShowModal(true)}
          className='border-4 border-black bg-black hover:bg-green-400 hover:scale-110 duration-300 p-5 m-5 w-48 rounded-3xl text-white hover:text-black'> 
          EDIT ITEM </button>

          {showModal ? (
            <>
            <div
            className="justify-center items-start flex  overflow-y-auto fixed inset-0 z-50"
          >
            <div className="absolute max-w-screen-2xl my-6 mx-auto">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Item
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                {/*body*/}
                
                <div className="relative p-6 flex-auto">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
                  <div>
                  <form className='flex flex-col items-start bg-white rounded-2xl p-1'>
                    {showData.map(({id, labelFor, labText, inpType}) => 
                    (
                      <span className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                      <label key={id} className='w-auto md:text-md text-sm ml-2' htmlFor={labelFor}> NEW {labText} </label>
                      <input required className=' flex-end m-1 p-2 bg-slate-300 rounded-md border-4 w-48 border-black' type={inpType} name={labelFor} id={labelFor} />
                      </span>
                    ))}
                  </form>
                  </div>
                  <div className='inline-block bg-gray-900 rounded-3xl px-2 py-2'>
                  {showData.map(({id, labelFor, labText, fetchedData}) => 
                    (
                      <div className="ml-2 mt-2 justify-center text-center text-white h-auto">
                        <p id="item-name-show" className=" text-sm md:text-md sm:text-sm py-3" >CURRENT {labText} </p>
                        <p className="text-red-600">{fetchedData}</p>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className='bg-red-800 mr-4 px-5 py-3 border-2 border-black rounded-3xl hover:scale-110 hover:bg-red-400 hover:text-black duration-300 text-white'
                    type="button" onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className='bg-black p-3 border-2 border-black rounded-3xl hover:scale-110 hover:bg-green-400 hover:text-black duration-300 text-white'
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  

          ) : status}
          
        </form>
    </div>
    
  )
}

export default EditItems