import React, { useState } from 'react'



const AddItems = () => {

  const current = new Date();
  const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

  const [data, setData] = useState({
    item_name : "",
    quantity: 0,
    purchase_price:0,
    purchase_date: "",
    sell_price: 0,
    quantity_sold: 0,
    sell_date: ""
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
    event.preventDefault()
    if (data){
      fetch("/add_item", {method : "POST", body: JSON.stringify(data), 
      headers: {"content-type": "application/json"},})
      .then((res) => {
        if (!res.ok) return Promise.reject(res);
        const msg = document.getElementById('conf-msg')
        msg.style = "color: green; font-weight: bold;"
        document.getElementById('conf-msg').innerHTML = "ITEM ADDED SUCCESSFULLY"
        setTimeout(()=>{
          window.open('/view','_self','noreferrer','noopener')
        },500)
        console.log("SENT TO SERVER")
        return res.json();
      }).then((data) => {
        console.log(data)
      }).catch(console.error)
    }else{
      const msg = document.getElementById('conf-msg')
      msg.style = "color: red; font-weight: bold;"
      msg.innerHTML = " MISSING ITEM DETAILS! "
    }
  };


  const inputFields = [{
    id: 1,
    labelFor: "item_name", 
    labText: "ITEM NAME: ",
    inpType: "text",
  },
  {
    id: 2,
    labelFor: "quantity", 
    labText: "QUANTITY: ",
    inpType: "number",
    min: 0,
    max: 99999,
  },
  {
    id: 3,
    labelFor: "purchase_price", 
    labText: "PURCHASE PRICE: ",
    inpType: "number",
    min: 0,
  },
  {
    id: 4,
    labelFor: "purchase_date", 
    labText: "PURCHASE DATE: ",
    inpType: "date",
    min: '1997-01-01',
    max: today,
  },
  {
    id: 5,
    labelFor: "quantity_sold", 
    labText: "QUANTITY SOLD: ",
    inpType: "number",
    min: 0,
    max: 99999,
  },
  {
    id: 6,
    labelFor: "sale_date",
    labText: "DATE OF SALE: ",
    inpType: "date",
    min: '1997-01-01',
    max: today,
  },
  {
    id: 7,
    labelFor: "selling_price",
    labText: "SELLING PRICE: ",
    inptType: "number",
    min: 0,
  }
  ]



  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-center text-lg md:text-2xl py-2 mb-3 mx-auto w-96 text-black bg-white rounded-b-3xl'> ADD ITEM </h1> 
      <div className=' w-fit h-fit bg-white rounded-2xl p-5'>
        <form className='flex flex-col items-center'>
          {inputFields.map(({labelFor, labText, inpType, min, max}, index) => 
          (
            <div className="flex flex-row" key={index}>
              <label className='w-36 md:w-15 sm:w-15 lg:w-36 mt-4 mr-1 sm:mr-4 md:mr-6 lg:mr-6' htmlFor={labelFor}> {labText} </label>
              <input aria-label={labText} required min={min} max={max} className='ml-0 lg:ml-6 md:ml-4 sm:ml-0 my-2 px-4 py-1 bg-slate-300 rounded-md w-36 md:w-48 sm:w-36 border-2 border-black' type={inpType} name={labelFor} id={labelFor} onChange={formChangeHandler}/>
            </div>
          ))}
          
          <button value="ADD ITEM" onClick={formSubmitHandler} 
          className='border-4 border-black bg-black hover:bg-green-400 hover:scale-105 duration-300 p-5 m-5 sm:w-48 md:w-64 rounded-3xl text-white hover:text-black'> ADD ITEM </button>
        </form>

        <p id="conf-msg"></p>

      </div>
    </div>
  )
}

export default AddItems