import React, { useState, useEffect } from "react";
import APIServices from "../services/APIServices.js";
import { useNavigate, useLocation } from "react-router-dom";
import RestaurantPage from "./RestaurantPage";
import { Button,Badge } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import Cart from "./Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Login.css';

function UserHome(props) {
    const location = useLocation();
    const token = location.state?.token || '';
    const [restaurants, setRestaurants] = useState([]);
    const [isRestroClicked, setIsRestroClicked] = useState(false);
    const [menuDetails, setMenuDetails] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/restaurants/', {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setRestaurants(data);
        })
        .catch(error => console.log(error))
    }, [])

    const restaurantHandler = async (restaurant_id) => {
        const restroMenuDetails = await APIServices.getRestaurantMenu(restaurant_id, token);
        setIsRestroClicked(true);
        setMenuDetails(restroMenuDetails);
    }

    const cartHandler = async () => {
        const groupedItems = cart.reduce((acc, curr) => {
            const found = acc.find((item) => item.name === curr.itemName);
            if (found) {
                found.totalCount += 1;
                found.totalPrice += parseFloat(curr.price);
            } else {
                acc.push({
                    name: curr.itemName,
                    totalCount: 1,
                    totalPrice: parseFloat(curr.price),
                });
            }
            return acc;
        }, []);

        navigate('/cart', {
            state: { cart: groupedItems }
        });
    }

    return (
        <div style ={{background:'linear-gradient(91.3deg, rgb(135, 174, 220) 1.5%, rgb(255, 255, 255) 100.3%)'}}className="commonBackground">
            <header className="header">
                <h4>Available Restaurants</h4>
                 <Button id='viewcart' title = "View Cart" variant="primary" onClick={cartHandler}>
                    <BsCart size={20} />
                    <Badge bg="danger">{cartCount}</Badge>
                </Button>
            </header>
            <br/>
                <br/>
                <hr/>
            <div className="loginText">
            {restaurants.map((restaurant) => (
                <div className="loginText" key={restaurant.restaurant_id}>
                    <Button id={`restaurant-${restaurant.restaurant_id}`} variant="contained" onClick={() => restaurantHandler(restaurant.restaurant_id)}>{restaurant.restroName}</Button>
                    <hr />
                </div>
            ))}
            </div>
            <div>
            <hr style={{ borderColor: 'rgba(0, 0, 0, 1)', width: '100%' }} />
            {isRestroClicked && (
        <>
        <h2 id='addbutton'className="loginText">Menu</h2>
        <RestaurantPage restaurantMenuDetails={menuDetails} cartCount={setCartCount} setCart={setCart}/>
        </>
)}
            </div>
        </div>
    );
}

export default UserHome;