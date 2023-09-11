import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBtnCart, toggleSearchForm } from "../../redux/products/products.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartShopping } from "../cart-shopping/CartShopping";
import { Search } from "../search/Search";

export function Header() {
  // Get the cart and btnCart state values from the Redux store
  const { cart, btnCart } = useSelector(state => state.product);
  
  // Get the dispatch function from the useDispatch hook
  const dispatch = useDispatch();

  // Function to toggle the cart visibility
  const toggleCart = () => dispatch(toggleBtnCart(true));
  
  // Function to toggle the search form visibility
  const toggleSearch = () => dispatch(toggleSearchForm(true));

  // Change the body overflow property based on the btnCart state value
  if (btnCart) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflow = 'visible';
  }

  return (
    // The header element with some classes
    <header className='w-screen bg-[#221f1f] fixed z-10 top-0 h-[50px]'>
      {/* A container for the header with some classes */}
      <div className='container text-lg flex justify-between items-center text-white h-[50px] max-w-[1240px] m-auto px-2'>
        {/* The logo */}
        <a href='/' className="logo">
        <span
            className="urbsty-text"
            style={{
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'Lobster, cursive',     
                WebkitBackgroundClip: 'text', // Clip text to background
                color: 'transparent', // Hide text color
            }}
            onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(to right, #ffa86b, #ff6b6b)'; // Change background on hover
            }}
            onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(to right, #ff6b6b, #ffa86b)'; // Revert background on hover out
            }}
        >
            UrbSty
        </span>
    </a>
    {/* The search input */}
    <Search />
        
        {/* A list of buttons */}
        <ul className='flex justify-between'>
          {/* The search button */}
          <button className='block md:hidden mr-2 px-[8px]' onClick={toggleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          
          {/* The user button */}
          <li className='mr-2 px-[8px] py-1 rounded hover:bg-gray-600 transition cursor-not-allowed md:mr-4'>
            <FontAwesomeIcon icon={faUser} className='text-xl'/>
          </li>
          
          {/* The cart button */}
          <button className='px-[6px] py-1 rounded hover:bg-gray-600 transition relative' onClick={toggleCart}>
            <FontAwesomeIcon icon={faCartShopping} className='text-xl'/>
            {/* Show the number of items in the cart */}
            {cart.length > 0 && <span className='absolute right-[-7px] top-0 bg-[#00a046] text-[12px] h-[10px] flex items-center justify-center px-[7px] py-[10px] rounded-full'>{cart.length}</span>}
          </button>
        </ul>
      </div>
      {/* The cart overlay */}
      {btnCart && <CartShopping cart={cart}/>}
    </header>
  );
}
