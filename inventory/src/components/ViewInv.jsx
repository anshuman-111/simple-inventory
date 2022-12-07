import React, { useEffect, useState } from 'react'
import {FiEdit3} from 'react-icons/fi'
import {ImBin2} from 'react-icons/im'
const ViewInv = () => {

const tableHeaders = [
  {
    id: 1,
    h_name: 'Item ID',
    style : 'sticky;'
  },
  {
    id: 2,
    h_name: 'Item Name',
    style : 'sticky;'
  },
  {
    id: 3,
    h_name: 'Quantity Puchased'
  },
  {
    id: 4,
    h_name: 'Purchase Price'
  },
  {
    id: 5,
    h_name: 'Purchase Date'
  },
  {
    id: 6,
    h_name: 'Selling Price'
  },
  {
    id: 7,
    h_name: 'Quantity Sold'
  },
  {
    id: 8,
    h_name: 'Sale Date'
  },
  {
    id: 9,
    h_name: 'Modify'
  },
]



const [data, setData] = useState({})

const [editModalData, setEditData] = useState({
  item_id: 0,
  item_name : "",
  purchase_date : "",
  purchase_price: 0,
  quantity : 0,
  quantity_sold : 0,
  selling_price: 0,
  sale_date: ""
})
const [delData, setDelData] = useState({
  item_id: 0,
  item_name: ""
})

const current = new Date();
const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;


const showData = [{
  id: 1,
  labelFor: "item_name", 
  labText: "ITEM NAME: ",
  inpType: "text",
  fetchedData: editModalData['item_name']
},
{
  id: 2,
  labelFor: "quantity", 
  labText: "QUANTITY: ",
  inpType: "number",
  min: 0,
  max: 99999,
  fetchedData: editModalData['quantity']
},
{
  id: 3,
  labelFor: "purchase_price", 
  labText: "PURCHASE PRICE: ",
  inpType: "number",
  min: 0,
  fetchedData: editModalData['purchase_price']
},
{
  id: 4,
  labelFor: "purchase_date", 
  labText: "PURCHASE DATE: ",
  inpType: "date",
  min: '1997-01-01',
  max: today,
  fetchedData: editModalData['purchase_date']
},
{
  id: 5,
  labelFor: "quantity_sold", 
  labText: "QUANTITY SOLD: ",
  inpType: "number",
  min: 0,
  max: 99999,
  fetchedData: editModalData['quantity_sold']
},
{
  id: 6,
  labelFor: "sale_date",
  labText: "DATE OF SALE: ",
  inpType: "date",
  min: '1997-01-01',
  max: today,
  fetchedData: editModalData['sell_date']
},
{
  id: 7,
  labelFor: "selling_price",
  labText: "SELLING PRICE: ",
  inptType: "number",
  min: 0,
  fetchedData: editModalData['sell_price']
}
]

const formChangeHandler = (event) => {
  event.preventDefault()

  const inputName = event.target.getAttribute('id')
  const inputValue = event.target.value

  const formData = {...data}

  console.log(formData)
  formData[inputName] = inputValue
  setData(formData)
}


const formSubmitHandler = (event) => {
  event.preventDefault()
  const itemID = editModalData['item_id']
  data['item_id'] = itemID
  if (Object.keys(data).length > 1){
    fetch("/edit_item", {method : "POST", body: JSON.stringify(data), 
    headers: {"content-type": "application/json"},})
    .then((res) => {
      if (!res.ok) return Promise.reject(res);
      setData({})
      setEditModal(false)
      setTimeout(()=>{
        window.open('/view','_self','noreferrer','noopener')
      },500)
      console.log("SENT TO SERVER")
      return res.json();
    }).then((data) => {
      console.log(data)
    }).catch(console.error)
  }else{
    document.getElementById("msg").innerHTML = " Atleast one change is required !"
  }
};




const [rows, setRows] = useState([{}])

useEffect(() => {
  // Using fetch to fetch the api from 
  // flask server it will be redirected to proxy
  fetch("/get_all").then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          console.log(data)
          setRows(data);
      })
  );
}, []);

const Row = (props) => {
    const {row, index} = props

    return (
      <tr key={row.item_id} className='hover:bg-black group hover:text-white text-black duration-200' >
              <td>{row.item_id}</td>
              <td>{row.item_name}</td>
              <td>{row.quantity}</td>
              <td>{row.purchase_price}</td>
              <td>{row.purchase_date}</td>
              <td>{row.selling_price}</td>
              <td>{row.quantity_sold}</td>
              <td>{row.sale_date}</td>
              <td className='flex flex-row items-center justify-center'>
                <button onClick={()=>{setEditModal(true); setEditData({
                  item_id: row.item_id,
                  item_name : row.item_name,
                  purchase_date : row.purchase_date,
                  purchase_price: row.purchase_price,
                  quantity : row.quantity,
                  quantity_sold : row.quantity_sold,
                  selling_price: row.selling_price,
                  sale_date: row.sale_date
                })}}
                className='mr-1 hover:bg-emerald-700 hover:cursor-pointer rounded-xl duration-300 p-3'>{ <FiEdit3 size={20}/>}</button> 
                <button onClick={()=>{setDelModal(true); setIdx(index); setDelData({item_id:row.item_id, item_name:row.item_name})}} 
                className='ml-1 mr-2 hover:bg-red-600 hover:cursor-pointer rounded-xl duration-300 p-3'>{<ImBin2 size={20}/>}</button> 
              </td>
              
            </tr>
    )
}


const Table = (props) => {
    const {data, delRow} = props
    return (
      <table className='justify-center text-center'>
        
          <thead>
            <tr>
              {tableHeaders.map(({id, h_name, style}) => (
                <th className='md:text-lg lg:text-xl px-3 border-2 z-8' style={{position : {style}}} key={id}>{h_name}</th>
              ))}
            </tr>
          </thead>
          <tbody className='pt-4 bg-green-100 rounded-t-xl'>
            {data.map((row,index) => 
              <Row key={`key-${index}`} delRow={delRow} row = {row} index = {index} />
            )}
          </tbody>
          </table>
    )
}


const [showEditModal, setEditModal] = useState(false)
const [showDelModal, setDelModal] = useState(false)
const [idxData, setIdx] = useState()


const deleteRow = (idx) => {
  var dpRow = [...rows]
  dpRow = dpRow.filter(
    (row, index) => idx!==index
  )
  if (delData){
    fetch("/del_item", {method : "POST", body: JSON.stringify(delData), 
    headers: {"content-type": "application/json"},})
    .then((res) => {
      if (!res.ok) return Promise.reject(res);
      const msg = document.getElementById('conf-msg')
      msg.style = "color: green; font-weight: bold;"
      document.getElementById('conf-msg').innerHTML = "ITEM DELETED SUCCESSFULLY"
      
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
  setRows(dpRow)
}

  return (
    <div className='flex flex-col items-center w-screen h-auto overflow-hidden overflow-x-auto'>
      {showEditModal ? (
            <>
            <div
            className="justify-center items-start flex  overflow-y-auto fixed inset-0 z-50"
          >
            <div className="absolute max-w-screen-2xl my-6 mx-auto text-black">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Item
                  </h3>
                </div>
                {/*body*/}
                
                <div className="relative p-6 flex-auto">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-10">
                  <div>
                  <form className='flex flex-col items-start bg-white rounded-2xl p-1'>
                  <input className='hidden' value={editModalData['item_id']} type='number' name='item_id' id='item_id'/>
                    {showData.map(({id, labelFor, labText, inpType, min, max}) => 
                    (
                      <span className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                      <label key={id} className='w-auto md:text-md text-md ml-2' htmlFor={labelFor}> NEW {labText} </label>
                      <input required placeholder="No change" className=' flex-end m-1 p-2 bg-slate-300 rounded-md border-4 w-48 text-sm placeholder-red-400 border-black' type={inpType} name={labelFor} id={labelFor} onChange={formChangeHandler} min={min} max={max}/>
                      </span>
                    ))}
                  </form>
                  </div>
                  <div className='inline-block bg-gray-900 rounded-3xl px-2 py-2'>
                  {showData.map(({labText, fetchedData}) => 
                    (
                      <div className="ml-2 mt-2 justify-center text-center text-white h-auto">
                        <p className=" text-sm md:text-md sm:text-sm py-3" >CURRENT {labText} </p>
                        <p className="text-red-600">{fetchedData}</p>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <p id='msg' className='text-sm text-red-500 font-bold mr-5'></p>
                  <button
                    className='bg-red-800 mr-4 px-5 py-3 border-2 border-black rounded-3xl hover:scale-110 hover:bg-red-400 hover:text-black duration-300 text-white'
                    type="button" onClick={() => {setEditModal(false); setEditData({}); setData({})}}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className='bg-black p-3 border-2 border-black rounded-3xl hover:scale-110 hover:bg-green-400 hover:text-black duration-300 text-white'
                    onClick={formSubmitHandler}
                  >
                    Save Changes
                  </button>
                </div>
                    
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  

          ) : null}
      {showDelModal ? (
            <>
            <div
            className="justify-center items-start flex  overflow-y-auto fixed inset-0 z-50"
          >
            <div className="absolute w-96 my-6 mx-auto text-black">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete Item {delData['item_id']}
                  </h3>
                  
                </div>
                {/*body*/}
                
                <div className="m-4 px-3 text-2xl">
                  <p>Are you sure you want to delete {delData['item_name']} ?</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    type="button"
                    className='bg-black p-3 border-2 border-black rounded-3xl hover:scale-110 hover:bg-green-400 hover:text-black duration-300 text-white'
                    onClick={() => setDelModal(false)}
                  > Close
                  </button>
                  <button
                    className='bg-red-800 ml-4 px-5 py-3 border-2 border-black rounded-3xl hover:scale-110 hover:bg-red-400 hover:text-black duration-300 text-white'
                    type="button" onClick={() => {setDelModal(false); deleteRow(idxData); }}
                  >
                    Confirm Delete
                  </button>
                  <p id='conf-msg'></p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
          ) : null}
      <div className='mt-40 mx-2 overflow-hidden overflow-x-auto lg:w-auto w-11/12 bg-gray-100 text-black rounded-t-3xl rounded-b-3xl p-6'>
        <Table data = {rows} 
          delRow = {deleteRow}
        />
      
      </div>
    </div>
  )
}

export default ViewInv