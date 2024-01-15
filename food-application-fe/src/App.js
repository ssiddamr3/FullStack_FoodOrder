import logo from './logo.svg';
import './App.css';
import { useState,useEffect, useContext } from 'react';
import RestaurantsList from './components/RestaurantsList';
import OwnerPage from './components/Owner-Home';
import UserHome from './components/User-Home';
import DataConext from './components/DataContext';
import Login from './components/Login';
import {Routes, Route,BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; 
import Cart from './components/Cart';

function App() {
  const [restaurants, setRestaurants] = useState([]); 
  const [data,setData] = useContext(DataConext);
  const [loginDetails, setLoginDetails] = useState([]);

  const fetchLoginDetails =() =>{

  }
  const logoutBtn =()=>{

  }


  useEffect(() => {
    fetch('http://127.0.0.1:8000/restaurants/',{
      'method': 'GET',
      'headers': {
        'Content-Type':'application/json',
        'Authorization':'Token d3dfa487052b59b3a22b248cb7a96bd0356d7d04',
      }
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json(); // This returns a Promise which resolves to JSON
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      setRestaurants(data); // Set the received data into state
    })
    .catch(error => console.log(error))
  }, [])

  return (

    // <DataConext.Provider value={{data,setData}}>
    // <div className="App">
    //   <header className="App">
    //     <h3>Django - React Application</h3>
    //     <br/> 
    //     <br/>
    //     <RestaurantsList restaurants={restaurants}/>
    //     {/* <OwnerPage/> */}
    //     <div className='col'>
    //     <button onClick={logoutBtn} className='btn btn-primary'>Logout</button>
    //   </div>
    //   </header>
    // </div>
    // </DataConext.Provider>
    <CookiesProvider>
    <BrowserRouter>
    <Routes>
    <Route exact path ='/' Component={Login}/>
    <Route exact path ='/restaurants' Component={App}/>
    <Route exact path='/owner-home' Component={OwnerPage}/>
    <Route exact path ='/user-home' Component={UserHome}/>
    <Route exact path ='/cart' Component={Cart}/>
    </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
