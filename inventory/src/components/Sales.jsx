import React, { useState } from 'react'

const Sales = () => {

    const date = new Date()
    const saleFields = [{
        labelFor: "item_name", 
        labText: "ITEM NAME: ",
        inpType: "text",
        placeholder: 'Enter Item Name here'
      },
      {
        labelFor: "qty_sold", 
        labText: "QUANTITY SOLD: ",
        inpType: "number",
        placeholder: 'Enter Quantity Sold here'
      },
      {
        labelFor: "sell_price", 
        labText: "SELLING PRICE: ",
        inpType: "number",
        placeholder: 'Enter Selling Price here',
        value: '45'
      },
      {
        labelFor: "sell_date", 
        labText: "SALE DATE: ",
        inpType: "date",
        placeholder: String(date.getDate()),
        value: String(date.getDate())
      },
      
    ]

  const [data, setData] = useState({
    item_name : "",
    qty_sold: 0,
    purPrice:0,
    purDate: "",
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
      fetch("/sell_item", {method : "POST", body: JSON.stringify(data), 
      headers: {"content-type": "application/json"},})
      .then((res) => {
        if (!res.ok) return Promise.reject(res);
        const msg = document.getElementById('conf-msg')
        msg.style = "color: green; font-weight: bold;"
        document.getElementById('conf-msg').innerHTML = "SALE RECORDED SUCCESSFULLY"
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




  return (
    <div>
      <h1 className='text-center text-2xl md:text-4xl py-2 mb-3 mx-auto w-96 mt-20 text-black bg-white rounded-b-3xl'> RECORD SALE </h1> 
      <div className='flex flex-col w-full items-center bg-white rounded-2xl p-5'>
        <form className='flex flex-col items-center'>
          {saleFields.map(({labelFor, labText, inpType, placeholder, value}, index) => 
          (
            <div className="grid" key={index}>
              <label className='mt-2' htmlFor={labelFor}> {labText} </label>
              <input required value={value} placeholder={placeholder} className='my-2 px-4 py-2 bg-slate-300 rounded-md md:w-96 sm:w-48 border-4 border-black' type={inpType} name={labelFor} id={labelFor} onChange={formChangeHandler}/>
            </div>
          ))}
          
          <button value="SALE" onClick={formSubmitHandler} 
          className='border-4 border-black bg-black hover:bg-green-400 hover:scale-105 duration-300 p-5 m-5 sm:w-48 md:w-64 rounded-3xl text-white hover:text-black'> RECORD SALE </button>
        </form>

        <p id="conf-msg"></p>

      </div>
    </div>
  )
}

export default Sales