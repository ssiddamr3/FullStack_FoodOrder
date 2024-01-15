import React from "react";


function RestaurantList(props) {
    return (
        <div>
            {Array.isArray(props.restaurants) ? (
            props.restaurants.map((restaurant) => (
                <React.Fragment key={restaurant.restaurant_id}>
                <h2>{restaurant.restroName === 'Indian Palace'?<p>Indiannn</p>: restaurant.restroName}</h2>
                <hr />
            </React.Fragment>
            ))
        ) : (
          <p>No restaurants found</p>
        )}
        </div>
    )

}
export default RestaurantList;