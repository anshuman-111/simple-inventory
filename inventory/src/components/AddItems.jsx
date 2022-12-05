import React, { useState } from 'react'



const AddItems = () => {
  const [data, setData] = useState({
    itemName : "",
    qty: 0,
    purPrice:0,
    purDate: ""
  })


  const formChangeHandler = (event) => {
    event.preventDefault()

    const inputName = event.target.getAttribute('id')
    const inputValue = event.target.value;

    const formData = {...data}
    formData[inputName] = inputValue;
    setData(formData)
  }


  const formSubmitHandler = (event) => {
    if (data){
      
      fetch("/add_item", {method : "POST", body: JSON.stringify(data), 
      headers: {"content-type": "application/json"},})
      .then((res) => {
        if (!res.ok) return Promise.reject(res);
        console.log("SENT TO SERVER")
        return res.json();
      }).then((data) => {
        console.log(data)
      }).catch(console.error)
    }};


  const inputFields = [{
    labelFor: "itemName", 
    labText: "ITEM NAME: ",
    inpType: "text"
  },
  {
    labelFor: "qty", 
    labText: "QUANTITY PURCHASED: ",
    inpType: "number"
  },
  {
    labelFor: "purPrice", 
    labText: "PURCHASE PRICE: ",
    inpType: "number"
  },
  {
    labelFor: "purDate", 
    labText: "PURCHASE DATE: ",
    inpType: "date"
  },
  
]



  return (
    <div>
      <h1 className='text-center text-2xl md:text-4xl py-2 mb-3 mx-auto w-96 mt-20 text-black bg-white rounded-b-3xl'> ADD ITEM </h1> 
      <div>
        <form className=' flex flex-col items-center bg-white rounded-2xl p-5'>
          {inputFields.map(({labelId, fieldId, labelFor, labText, inpType}, index) => 
          (
            <div key={index}>
            <label htmlFor={labelFor}> {labText} </label>
            <input required className=' m-3 p-2 bg-slate-300 rounded-md w-96 border-4 border-black' type={inpType} name={labelFor} id={labelFor} onChange={formChangeHandler}/>
            </div>
          ))}
          
        </form>
          <button value="ADD ITEM" onClick={formSubmitHandler} 
          className='border-4 border-black bg-black hover:bg-green-400 hover:scale-110 duration-300 p-5 m-5 w-96 rounded-3xl text-white hover:text-black'> ADD ITEM </button>
      </div>
    </div>
  )
}

export default AddItems