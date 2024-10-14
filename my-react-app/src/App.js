import './App.css';
import shirt1 from './shirt.jpg';
import sweatshirt from './sweatshirt.jpg'
import sweats from './sweats.jpg'
import hat from './hat.webp'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
//second import uses navigation to change pages
import React, { useState } from 'react';
//third import for extracting data

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





/* TODO: FIGURE OUT A UNIVERSAL ID COUNTER TO ASSOCIATE WITH AN ACCOUNT,
MAKE PRODUCTS LANDING PAGE POPULATED, MOCK DATA IS, FILL W PICTURES, IMAGES, PRICES
*/





function Products(){
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
            <td>
              <img src={shirt1} alt="Shirt 1" width="100" />
              <input type="text" placeholder="Shirt 1" />
            </td>
            <td>
              <img src={shirt1} alt="Shirt 2" width="100" />
              <input type="text" placeholder="Shirt 2" />
            </td>
            <td>
              <img src={shirt1} alt="Shirt 3" width="100" />
              <input type="text" placeholder="Shirt 3" />
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
            <td>
              <img src={sweatshirt} alt="sweatshirt" width="100"/>
              <input type="text" placeholder="sweatshirt 1" />
            </td>
            <td>
              <img src={sweatshirt} alt="sweatshirt" width="100"/>
              <input type="text" placeholder="sweatshirt 2" /></td>
            <td>
              <img src={sweatshirt} alt="sweatshirt" width="100"/>
              <input type="text" placeholder="sweatshirt 3" />
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
            <td>
              <img src={sweats} alt="sweats" width="100"/>
              <input type="text" placeholder="sweats 1" />
            </td>
            <td>
              <img src={sweats} alt="sweats" width="100"/>
              <input type="text" placeholder="sweats 2" /></td>
            <td>
              <img src={sweats} alt="sweats" width="100"/>
              <input type="text" placeholder="sweats 3" /></td>
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
            <td>
              <img src={hat} alt="hat" width="100"/>
              <input type="text" placeholder="hat 1" /></td>
            <td>
              <img src={hat} alt="hat" width="100"/>
              <input type="text" placeholder="hat 2" /></td>
            <td>
              <img src={hat} alt="hat" width="100"/>
              <input type="text" placeholder="hat 3" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
// placeholder, this will become the form to create an account
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
      </Routes>
    </Router>
  );
}

export default App;
