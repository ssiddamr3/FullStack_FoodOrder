import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Login.css';

function RestaurantPage(props) {
  const [addedToCartItems, setAddedToCartItems] = useState([]);
  const [showCart, setShowCart] = useState(true);

  const addToCartHandler = async (menuItem) => {
    const updatedCart = [...addedToCartItems, menuItem];
    await setAddedToCartItems(updatedCart);
    if (updatedCart.some(item => item.menuItem_id === menuItem.menuItem_id)) {
       await setShowCart(false);
    }
    props.cartCount(updatedCart.length)
    props.setCart(updatedCart)
  };

  const removeFromCartHandler = async (menuItem) => {
    const indexToRemove = addedToCartItems.findIndex(
      (item) => item.menuItem_id === menuItem.menuItem_id
    );
    const updatedCart = [...addedToCartItems];
    updatedCart.splice(indexToRemove, 1);
    await setAddedToCartItems(updatedCart);
    if (updatedCart.length === 0) {
      await setShowCart(true);
    } else {
      await setShowCart(false);
    }
    props.setCart(updatedCart)
    props.cartCount(updatedCart.length)
  };

  return (
    <div className="loginText"style ={{background: 'linear-gradient(68.6deg, rgb(252, 165, 241) 1.8%, rgb(181, 255, 255) 100.5%)'}}>
      {props.restaurantMenuDetails.map((menuItem) => (
        <div key={menuItem.menuItem_id}>
            <br/>
          <p><strong>{menuItem.itemName}</strong></p>
          {addedToCartItems.some(
            (item) => item.menuItem_id === menuItem.menuItem_id
          ) ? (
            <div style={{ display: 'flex', justifyContent: 'center' }} className="loginText">
            <span>
                <button className="btn btn-warning" onClick={() => removeFromCartHandler(menuItem)}>-</button>
                <h3>1</h3>
                <button className="btn btn-warning" onClick={() => addToCartHandler(menuItem)}>+</button>
            </span>
             <hr/>
            </div>
          ) : (
            <div>
            <button id={`addbutton-${menuItem.menuItem_id}`} class="btn btn-warning" onClick={() => addToCartHandler(menuItem)}>
              Add to Cart
            </button>
            <hr/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RestaurantPage;
