import React, { useState } from "react";
import APIServices from "../services/APIServices.js";

function UpdateForm(props) {
  const [editItemId, setEditItemId] = useState(null);
  const [isChangesClicked, setIsChangesClicked] = useState(false);
  const [editedItemName, setEditedItemName] = useState('');
  const [editedItemPrice, setEditedItemPrice] = useState('');
  const [closeTab, setCloseTab] = useState(props.isClose);

  const ownNameHandler = (e) => {
    const updatedValue = e.target.value;
    setEditedItemName(updatedValue);
  };

  const priceHandler = (e) => {
    const updatedPriceValue = e.target.value;
    setEditedItemPrice(updatedPriceValue);
  };

  const handleUpdateClick = async (menuItem) => {
    setIsChangesClicked(true);
    setEditItemId(menuItem.menuItem_id);
    setEditedItemName(menuItem.itemName);
    setEditedItemPrice(menuItem.price);
  };

  const handleDeleteClick = async(menuItem) => {
    const menuId = menuItem.menuItem_id
    await APIServices.deleteItem(menuId,props.token);
    console.log('deleted');
  };

  const handleSaveChanges = async (menuItem) => {
    await setIsChangesClicked(false);
    await setEditItemId(null);
    menuItem.itemName = editedItemName;
    menuItem.price = editedItemPrice;
    const menuId = menuItem.menuItem_id;
    APIServices.updateMenu(menuId, props.token, menuItem);
  };
  
  const closeTabHandler =async () =>{
    await setCloseTab(true); 
  };

  return (
    closeTab ? null : (
      <div id='updateitemsdiv'>
        <hr />
        {props.menuDetails.map((menuItem) => (
          <div key={menuItem.menuItem_id} className="mb-3">
            <div>
              {!isChangesClicked || !editItemId || editItemId !== menuItem.menuItem_id ? (
                <div>
                  <h3>{menuItem.itemName}</h3>
                  <h3>{menuItem.price}</h3>
                </div>
              ) : (
                <div id='updateitemform'>
                  <input
                    id={`itemname-${menuItem.menuItem_id}`}
                    type="text"
                    className="form-control mb-2"
                    value={editedItemName || menuItem.itemName}
                    placeholder="Please enter the updated item name"
                    onChange={ownNameHandler}
                  />
                  <input
                    id={`itemprice-${menuItem.menuItem_id}`}
                    type="text"
                    className="form-control mb-2"
                    value={editedItemPrice || menuItem.price}
                    placeholder="Please enter the updated item price"
                    onChange={priceHandler}
                  />
                  {isChangesClicked && (
                    <div>
                    <button id='savechanges' className="btn btn-primary mr-2" onClick={() => handleSaveChanges(menuItem)}>Save Changes</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <br/>
            <span className="mb-3">
            <button id={`updateitemname-${menuItem.menuItem_id}`} className="btn btn-success mr-2" onClick={() => handleUpdateClick(menuItem)}>Update Item</button> -
            <button id={`deleteitempname-${menuItem.menuItem_id}`} className="btn btn-danger" onClick={() => handleDeleteClick(menuItem)}>Delete Item</button>
            </span>
            <hr />
          </div>
        ))}
        <br />
        <button className="btn btn-secondary" onClick={closeTabHandler}>Close Tab</button>
      </div>
    )
  );
}

export default UpdateForm;
