import React, { useContext } from "react";
import Nav from "../component/Nav";
import Categories from "../Category";
import Cart from "../component/Cart";
import { food_items } from "../food";
import { dataContext } from "../context/UserContext";
import { MdCancel } from "react-icons/md";
import Card from "../component/Card";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Home() {
  let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext);

  // Optimized filter function
  function filter(category) {
    setCate(category === "All" ? food_items : food_items.filter((item) => item.food_category === category));
  }

  let items=useSelector(state=>state.cart)

  let subtotal=items.reduce((total,item)=>total+item.price*item.qty,0)

  let deliveryFree=20;
  let taxes=subtotal*0.5/100;
  let total=subtotal+deliveryFree+taxes




  

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <Nav />

      {/* Show categories if no search input */}
      {!input && (
        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
          {Categories?.map((item, index) => (
            <button
              key={index}
              className="w-[140px] h-[150px] bg-white flex flex-col items-center justify-center gap-3 p-5 text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200"
              onClick={() => filter(item.name)}
            >
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </button>
          ))}
        </div>
      )}

      {/* Display filtered food items */}
      <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8">
        {cate?.map((item) => (
          <Cart
            key={item.id}
            name={item.food_name}
            image={item.food_image}
            price={item.price}
            id={item.id}
            type={item.food_type}
          />
        ))}
      </div>

      {/* Cart Sidebar */}
      <div className={` w-full md:w-[40vw] h-full fixed top-0 right-0 bg-white shadow-xl p-6 transition-transform duration-500 ease-in-out flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>
        <header className="w-full flex justify-between items-center">
          <span className="text-green-400 text-[18px] font-semibold">Order items</span>
          <MdCancel
            className="w-[20px] h-[20px] text-green-400 cursor-pointer hover:text-gray-600"
            onClick={() => setShowCart(false)}
            aria-label="Close cart"
          />
        </header>
        {items.length>0? <>
        <div className="w-full mt-9 flex flex-col gap-8">
        {items.map((item)=>(<Card name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}/>))}
        {/* <Card/> */}
        </div>
        <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8">
          <div className="w-full flex justify-between items-center">
            <span className="text-lg text-gray-600 font-semibold">Subtotal</span>
            <span className="text-green-400  font-semibold text-lg">Rs {subtotal}</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="text-lg text-gray-600 font-semibold">Delivery Fee</span>
            <span className="text-green-400  font-semibold text-lg">Rs {deliveryFree}</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="text-lg text-gray-600 font-semibold">Taxes</span>
            <span className="text-green-400  font-semibold text-lg">Rs {taxes}</span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center p-9">
            <span className="text-2xl text-gray-600 font-semibold">Total</span>
            <span className="text-green-400  font-semibold text-lg">Rs {total}</span>
          </div>
         <button className="w-[80%] p-3 rounded-lg bg-green-300 text-gray-700 hover:bg-green-400 transition-all" onClick={()=>{toast.success("Order Placed")}}>Place Order</button> 
         </>:<div className="text-center  text-2xl text-green-500 font-semibold pt-5">Empty Cart</div>}
       
      </div>
    </div>
  );
}

export default Home;
