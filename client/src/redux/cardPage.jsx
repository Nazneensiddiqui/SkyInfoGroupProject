// src/pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from './cartslice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2 flex justify-between items-center border-b pb-2">
                <div>
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => dispatch(clearCart())}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
