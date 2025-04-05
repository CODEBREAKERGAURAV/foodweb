import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { DecreamentQty, IncreamentQty, RemoveItem } from '../redux/cartSlice';

function Card({name,id,price,image,qty}){
  let dispatch=useDispatch()
  return (
    <div className="w-full h-[120px]  p-2 shadow-lg flex justify-between">
      {/* left */}
      <div className="w-[60%] h-full  flex gap-5">
        <div className="w-[50%] h-full overflow-hidden rounded-lg">
          <img src={image} alt='' className="object-cover"/>
        </div>
        <div className="w-[40%] h-full flex flex-col gap-3">
           <div className="text-lg text-gray-600 font-semibold ">{name}</div>
           <div className="w-[110px] h-[50px] bg-slate-400 flex rounded-lg overflow-hidden shadow-lg border border-green-400 font-semibold text-xl">
           <button
  className="w-[30%] h-full bg-white flex justify-center items-center text-green-400 hover:bg-gray-200"
  onClick={() => {
    if (qty > 1) {
      dispatch(DecreamentQty({ id: id }));
    }
    else{
      alert("Minimum Qualtity is 1")
    }
  }}
>
  -
</button>

            <span className="w-[40%] h-full  flex justify-center items-center bg-slate-200 text-green-400" >{qty}</span>
            <button className="w-[30%] h-full bg-white flex justify-center items-center text-green-400 hover:bg-gray-200" onClick={()=>{dispatch(IncreamentQty({id:id}))}}>+</button>

           </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col justify-start items-end gap-6">
      <span className="text-xl text-green-400 font-semibold">{price}</span>
      <RiDeleteBin5Line className="w-[30px] h-[30px] text-red-400 cursor-pointer" onClick={()=>dispatch(RemoveItem(id))} />
      </div>
    </div>
  )
}

export default Card