import React, { useContext, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from "../context/userContext";
import { food_items } from "../food";
import { useSelector } from "react-redux";

function Nav() {
  let { input, setInput, cate, setCate, showCart, setShowCart } = useContext(dataContext);

  useEffect(() => {
    let newlist = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    );
    setCate(newlist);
  }, [input, setCate]); // Ensures reactivity

  let items=useSelector(state=>state.cart)

  return (
    <div className="w-full h-[100px] flex justify-between items-center px-5 md:px-8">
      {/* Logo */}
      <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl">
        <MdFastfood className="w-[30px] h-[30px] text-green-500" />
      </div>

      {/* Search Bar */}
      <form
        className="w-[45%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md md:w-[70%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <FaSearch className="text-green-500" />
        <input
          type="text"
          placeholder="Search Items..."
          className="w-full outline-none text-[16px] md:text-[20px]"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          aria-label="Search for items"
        />
      </form>

      {/* Shopping Bag */}
      <div 
        className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer"
        onClick={() => setShowCart(true)}
      >
        <span className="absolute top-0 right-2 text-green-500 font-bold text-[18px]">
          {items.length}
        </span>
        <LuShoppingBag className="w-[30px] h-[30px] text-green-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Nav;
