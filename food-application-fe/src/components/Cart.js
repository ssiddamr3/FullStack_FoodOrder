import React from "react";
import { useLocation } from "react-router-dom";
import "./Cart.css"; // Import the CSS file for Cart styles

function Cart() {
  const location = useLocation();
  const menu_Details = location.state?.cart || [];
  const totalPrice = menu_Details.reduce((total, menuItem) => {
    return total + parseFloat(menuItem.totalPrice);
  }, 0);

  return (
    <div className="cartBody">
    <div className="cart-container">
      <h1 className="cart-heading">Cart</h1>
      <div className="cart-items">
        {menu_Details.map((menuItem) => (
          <div key={menuItem.menuItem_id} className="cart-item">
            <p className="item-name">{menuItem.name} X {menuItem.totalCount}</p>
          </div>
        ))}
      </div>
      <p className="total-price">Total Price: {totalPrice}</p>
    </div>
    </div>
  );
}

export default Cart;
