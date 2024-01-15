import axios from 'axios';
// const axios = require("axios")
export default class APIServices{

    static async loginUser(body){
        return fetch('http://127.0.0.1:8000/auth/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())

    }

    static async registerUser(body){
        return fetch('http://127.0.0.1:8000/users/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())

    }

    static async checkUsernames() {
        try {
            const response = await fetch('http://127.0.0.1:8000/usernames/get_allUsernames/');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null; // Or handle the error in a way appropriate for your application
        }
    }

    static async getUserDetails(username, token) {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/${username}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`, // Include the token in the Authorization header
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }

    static async getOwnerRestaurantDetails(restaurant_id,token){
        try {
            const response = await axios.get(`http://127.0.0.1:8000/restaurants/${restaurant_id}/`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                },
            });
            return response.data;
        }
        catch(error){
            console.error('Error fetching restaurant details:',error)
            throw error;
        }
    }

    static async getRestaurantMenu(restaurant_id, token){
        try {
            const response = await axios.get(`http://127.0.0.1:8000/menu/?restaurant_id=${restaurant_id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                },
            });
            return response.data;
        }
        catch(error){
            console.error('Error fetching restaurant details:',error)
            throw error;
        }
    }
    
    static async updateMenu(menuItem_id, token, body) {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/menu/${menuItem_id}/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating restaurant menu details:', error);
            throw error;
        }
    }


    static async deleteItem(menuItem_id, token) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/menu/${menuItem_id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting item details:', error);
            throw error;
        }
    }

}