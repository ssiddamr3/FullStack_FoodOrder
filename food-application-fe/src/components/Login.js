import React, { useEffect, useState, useContext } from "react";
import APIServices from "../services/APIServices.js";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DataContext from "./DataContext";
import OwnerPage from "./Owner-Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Login.css';
import Loading from "./Loading";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useCookies(['mytoken']);
    const [isLogin, setLogin] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isValid,setIsValid] = useState(true);
    const [isUnique,setIsUnique] = useState(true);
    const [isOwner,setIsOwner,getOwnerValue] = useState(false);
    const { setData } = useContext(DataContext);
    const [restroDetails, setRestroDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    let history = useNavigate();
    let category = '';
        
        const loginBtn = async () => {
            try {
              setIsLoading(true);
              const loginResp = await APIServices.loginUser({ username, password });
              const authToken = loginResp.token;
              console.log(authToken);
              await setToken('mytoken', authToken);
            
          
              if (authToken !== '') {
                const userResp = await APIServices.getUserDetails(username, authToken);
                category = userResp.category;
          
                if (userResp.username === username && userResp.password === password) {
                  await setIsValid(true);
                

                  if(isValid){
                  if (category === 'owner') {
                    let restaurant_id = userResp.restaurant_id.restaurant_id;
                    const restroDetailsData = await APIServices.getOwnerRestaurantDetails(restaurant_id, authToken);
                    await setRestroDetails(restroDetailsData);
          
                    // Now, perform the navigation after all state updates
                    history('/owner-home', {
                      state: { restro_Details: restroDetailsData,
                            token: authToken,}
                    });
                  }
                 else if (category === 'user'){
                    let userId = userResp.user_id;
                    history('/user-home',{
                        state:{
                            token:authToken,
                        }
                    }
                    )
                  }
                }
              }
             } else {
                setIsValid(false);
                console.log(isValid);
              }
              setIsLoading(false); 
            } catch (error) {
            setIsValid(false);
            setIsLoading(false); 
              console.error('Error during login:', error);
              // Handle errors here
            }
          };
          
    const registerBtn = async() => {
        const usernamesList = await APIServices.checkUsernames();
        // console.log(username)
        // console.log(usernamesList.user_name)
        // console.log(!usernamesList.user_name.includes(username))
        setIsUnique(usernamesList.username.includes(username))
    };

    return (
        <div  className="backgroundShade">
            {isLoading && 
            <div className="customForm">
            <Loading/> 
            </div>} {/* Show loading text or icon */}
        {!isLoading &&         
        <div>
        <div className='customform'>
      {isLogin ? <h1 className="loginText">Please Login!</h1> : <h1> Register Here</h1>}

    <div data-testid='login-1' className="loginText">
      <div className="mb-3">
        <label htmlFor="username" className="form-label loginText" data-bs-placement="top" data-bs-original-title="Tooltip on top">Username</label>
        <input type="text" className="form-control loginText" id="username" placeholder="Please enter username"
          value={username} onChange={(e) => {setUsername(e.target.value); setIsEmpty(e.target.value === ''); setIsUnique(e.target.value === ''); }} />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label customform">Password</label>
        <input type="password" className="form-control loginText" id="password" placeholder="Please enter password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-3 loginText">
        {isLogin ? <button className="btn btn-success" onClick={loginBtn} id="loginBtn">Login</button> :
          <button className="btn btn-success" id="register" onClick={registerBtn}>Register</button>
        }
        <div className="loginText">
        {!isEmpty && isUnique && <p className="text-danger">The username is already taken, please enter another one</p>}
        {(isEmpty && isValid) && <p>Please enter username and password</p>}
        {(!isValid && !isEmpty) && <p className="text-danger">Enter valid username and password</p>}
        </div>
      </div>
      </div>

      <div className="mb-3">
        {isLogin ?
          <h5>If you don't have an account, Please <button className="btn btn-warning" onClick={() => setLogin(false)}>Register</button> Here</h5> :
          <h5>If you have an account, Please <button className="btn btn-warning" onClick={() => setLogin(true)}>Login</button> Here</h5>
        }
    </div>
    </div>
  </div>
}
  </div>
  );
}

export default Login;
