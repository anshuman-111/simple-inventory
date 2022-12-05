import React, { useEffect, useState } from 'react'

const ViewInv = () => {

  const tableHeaders = [
  {
    id: 1,
    h_name: 'Item ID'
  },
  {
    id: 2,
    h_name: 'Item Name'
  },
  {
    id: 3,
    h_name: 'Quantity Available'
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
    h_name: 'Sale Date'
  },
]


const [rows, setRows] = useState([{}])

useEffect(() => {
  // Using fetch to fetch the api from 
  // flask server it will be redirected to proxy
  fetch("/get_all").then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          console.log(data)
          setRows(data);
            /* itemID : data.itemID,
            itemName: data.itemName,
            qty: data.qty,
            purPrice: data.purPrice,
            purDate: data.purDate,
            sellPrice: data.sellPrice,
            sellDate: data.sellDate */
      })
  );
}, []);




  return (
    <div>
      <div className='mt-40 bg-gray-100 text-black rounded-t-3xl rounded-b-3xl p-6'>
        <table className='justify-center text-center table-auto'>
        
          <thead>
            <tr className=''>
              {tableHeaders.map(({id, h_name}) => (
                <th className='text-xl px-6' key={id}>{h_name}</th>
              ))}
            </tr>
          </thead>
          <tbody className='pt-4 bg-green-100 rounded-t-xl'>
            {rows.map((row)=>
            <tr className='hover:bg-black active:bg-green-800 hover:text-white duration-200 '>
              <td>{row.itemID}</td>
              <td>{row.itemName}</td>
              <td>{row.qty}</td>
              <td>{row.purPrice}</td>
              <td>{row.purDate}</td>
              <td>{row.sellPrice}</td>
              <td>{row.sellDate}</td>
            </tr> )}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewInv