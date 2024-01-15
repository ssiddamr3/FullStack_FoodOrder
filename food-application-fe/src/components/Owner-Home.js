import { useLocation } from 'react-router-dom';
import UpdateForm from './UpdateForm.';
import APIServices from '../services/APIServices.js';
import React, { useState, useEffect } from 'react';

function OwnerPage(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [menuDetails, setMenuDetails] = useState([]);
  const location = useLocation();
  const restro_Details = location.state?.restro_Details || {};
  const token = location.state?.token || '';
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    if (token && restro_Details.restaurant_id) {
      fetchMenuDetails(restro_Details.restaurant_id, token);
      console.log('*********', restro_Details.restaurant_id);
    }
  }, [isEdit]);

  const fetchMenuDetails = async (restaurantId, authToken) => {
    try {
      console.log(restaurantId);
      console.log(authToken);
      const details = await APIServices.getRestaurantMenu(restaurantId, authToken);
      await setMenuDetails(details);
      console.log(details);
    } catch (error) {
      console.error('Error fetching menu details:', error);
      // Handle error
    }
  };

  const updatedInformation = async (updatedData) => {
    let newData = updatedData;
    await setMenuDetails(newData);
  };

  const editMenu = async () => {
    await setIsEdit(!isEdit);
    await setIsClose(false);
  };

  return (
    <div className='App vh-100 d-flex justify-content-center align-items-center' style={{ background: 'linear-gradient(91.3deg, rgb(135, 174, 220) 1.5%, rgb(255, 255, 255) 100.3%)' }}>
      <div className='container text-center'>
        <h1>Owner Page</h1>
        <div>
          <h3>Restaurant Name: {restro_Details.restroName}</h3>
          <h3>Location: {restro_Details.location}</h3>
          <h3 id='availablemenu'>Available Menu:</h3>
          {menuDetails.map((menuItem) => (
            <div key={menuItem.menuItem_id}>
              <h2>{menuItem.itemName}</h2>
            </div>
          ))}
        </div>
        <div className='row mt-3'>
          <div className='col-md-12'>
            <button id='updatemenubutton' className='btn btn-primary' onClick={() => editMenu()}>
              Update Menu
            </button>
          </div>
        </div>
        {!isClose && isEdit && menuDetails && Object.keys(menuDetails).length > 0 ? (
          <UpdateForm restroDetails={restro_Details} menuDetails={menuDetails} updatedInformation={updatedInformation} token={token} setIsEdit={setIsEdit} />
        ) : null}
      </div>
    </div>
  );
}

export default OwnerPage;
