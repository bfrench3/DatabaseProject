import './App.css';
import shirt1 from './shirt.jpg';
import sweatshirt from './sweatshirt.jpg'
import sweats from './sweats.jpg'
import hat from './hat.webp'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
//second import uses navigation to change pages
import React, { useState } from 'react';
//third import for extracting data
import { useLocation } from 'react-router-dom';

//function for both buttons, either create or login
function LoginButtons() {
  const navigate = useNavigate(); // for navigating between pages

  function handleClickCreate() {
    navigate("/create-account"); // navigates in the url to localhost:3000/create-account
  }
  function handleClickLogin(){
    navigate("/login"); //navigates to login form
  }

  return ( // displays the 2 option buttons on page load
    <div id="buttons">
      <button id="create-account" onClick={handleClickCreate}>Create Account</button>
      <button id="login" onClick={handleClickLogin}>Login</button>
    </div>
    //the onClick invokes function above to navigate to their respective urls
  );
}





/* ADD A CART PAGE */ 

function Cart(){
  const location = useLocation();
  const { altText } = location.state || {};

  return (
    <div>
      <h1>Cart</h1>
      {altText ? <p>Item: {altText}</p> : <p>No item selected</p>}
    </div>
  );
}



function Products(){
  const navigate = useNavigate();

  const handleClick = (alt) => {

    // Pass the alt text as state when navigating
    navigate("/cart", { state: { altText: alt } });
  };
  return(
    <div>
      <h1 id="title">Impact Strength Club Merchandise Site</h1>
      <table>
        <thead>
          <tr>
            <th>Shirts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id = "item" onClick={() => handleClick("Shirt 1")}>
              <img src={shirt1} alt="Shirt 1" width="100" />
              <textarea value={`Shirt 1\n19.99`} readOnly />

            </td>
            <td id = "item" onClick={() => handleClick("Shirt 2")}>
              <img src={shirt1} alt="Shirt 2" width="100" />
              <textarea value={`Shirt 2\n24.99`} readOnly />
            </td>
            <td id = "item" onClick={() => handleClick("Shirt 3")}>
              <img src={shirt1} alt="Shirt 3" width="100" />
              <textarea value={`Shirt 3\n29.99`} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Sweatshirts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id = "item" onClick={() => handleClick("sweatshirt 1")}>
              <img src={sweatshirt} alt="sweatshirt" width="100"/>
              <textarea value={`sweatshirt 1\n24.99`} readOnly />
            </td>
            <td id = "item" onClick={() => handleClick("sweatshirt 2")}>
              <img src={sweatshirt} alt="sweatshirt" width="100"/>
              <textarea value={`sweatshirt 2\n34.99`} readOnly />
              </td>
            <td id = "item" onClick={() => handleClick("sweatshirt 3")}>
              <img src={sweatshirt} alt="sweatshirt" width="100"/>
              <textarea value={`sweatshirt 3 2\n39.99`} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Pants</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id = "item" onClick={() => handleClick("sweats 1")}>
              <img src={sweats} alt="sweats" width="100"/>
              <textarea value={`sweats 1\n19.99`} readOnly />
            </td>
            <td id = "item" onClick={() => handleClick("sweats 2")}>
              <img src={sweats} alt="sweats" width="100"/>
              <textarea value={`sweats 2\n23.99`} readOnly />
              </td>
            <td id = "item" onClick={() => handleClick("sweats 3")}>
              <img src={sweats} alt="sweats" width="100"/>
              <textarea value={`sweats 3\n29.99`} readOnly />
              </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Hats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id = "item" onClick={() => handleClick("hat 1")}>
              <img src={hat} alt="hat" width="100"/>
              <textarea value={`hat 1\n9.99`} readOnly />
              </td>
            <td id = "item" onClick={() => handleClick("hat 2")}>
              <img src={hat} alt="hat" width="100"/>
              <textarea value={`hat 1\n12.99`} readOnly />
              </td>
            <td id = "item" onClick={() => handleClick("hat 3")}> 
              <img src={hat} alt="hat" width="100"/>
              <textarea value={`hat 1\n15.99`} readOnly />
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


function CreateAccount() {
  const navigate = useNavigate(); //invoke library
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username: ', username);
    console.log('Password: ', password);
    console.log('Email: ', email);
    console.log('address: ', address);
    navigate("/products");
  };

  return (
    <div>
      <h2 id = "title">Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className = "form-label">Enter your email: 
            <input type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </label>
        </div>
        <div className="form-group">
          <label className = "form-label">Shipping Address: 
            <input 
              type = "text"
              value ={address}
              onChange={(e) => setAddress(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className = "form-label">Enter a username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className = "form-label"> Enter a password: 
            <input 
              type = "text" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <input type="submit" id="submitButton" value = "create" />
      </form>
    </div>
  );
}

function Login(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    navigate("/products");
  };
  
  return (
    <div>
      <h2 id="title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username: 
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Password: 
            <input 
              type = "text"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
        </div>
        <input type="submit" id="submitButton" value = "Login"/>
      </form>
   
    </div>
  );
}

// Home Component
function Home() {
  return (
    <div>
      <h1 id="title">Impact Strength Club Merchandise Site</h1>
      <LoginButtons />
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
