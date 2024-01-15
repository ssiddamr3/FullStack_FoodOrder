import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Routes, Route,BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import OwnerPage from './components/Owner-Home';
import { CookiesProvider } from 'react-cookie';

// function Router(){
//   return(
//     <CookiesProvider>
//     {/* <BrowserRouter>
//     <Routes>
//     <Route exact path ='/' Component={Login}/>
//     <Route exact path ='/restaurants' Component={App}/>
//     <Route exact path='/owner-home' Component={OwnerPage}/>
//     </Routes>
//     </BrowserRouter> */}
//     </CookiesProvider>
//   )
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
