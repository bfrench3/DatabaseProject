/* WHAT IS NEXT - ADD A SERVER FILE TO INTERACT WITH DATABASE, FOR LOGGING IN, CART STUFF AND CREATING AN ACCOUNT */


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

function OrderPlaced(){
  const orderNo = 0; //make a global that gets incremented every time this page is reached and use ${orderNo}
  //orderNo++;
  const navigate = useNavigate(); 
  function continueShopping(){
    navigate("/products");
  }
  return (
    <div>
      <h1>Congrats! order number ${orderNo} has been placed!</h1> 
      
      <button id="continue" onClick={continueShopping}>Continue shopping</button>
    </div>
  );
}

function Cart(){
  const location = useLocation();
  const navigate = useNavigate(); 
  const { title, price, size, quantity } = location.state || {};
  const total = price * quantity;
  function handlePurchase(){
    navigate("/orderplaced");
  }
  function continueShopping(){
    navigate("/products");
  }
  return (
    <div>
      <h1>Cart</h1>
      {title ? (
        <div>
          <p>Item: {title}</p>
          <p>Price: ${price.toFixed(2)}</p>
          <p>Size: {size}</p>
          <p>Quantity: {quantity}</p>
        </div>
      ) : (
        <p>No item selected</p>
      )}
      <h2>Total cost: {total} </h2>
      <button id="continue" onClick={continueShopping}>Continue shopping</button>
      <button id="order" onClick={handlePurchase}>Place order</button>
    </div>
  );
}



function Products(){
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});

  const handleSizeChange = (id, size) => {
    setSelectedSize(prev => ({ ...prev, [id]: size }));
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedQuantity(prev => ({ ...prev, [id]: quantity }));
  };

  function placeOrder(){
    navigate("/orderplaced");
  }
  const handleClick = (id, title, price) => {
    const size = selectedSize[id] || 'S'; // Default size to M if not selected
    const quantity = selectedQuantity[id] || 1; // Default quantity to 1 if not selected
    navigate("/cart", { state: { title, price, size, quantity } });
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
          <td id="item">
              <img src={shirt1} alt="Shirt 1" width="100" />
              <textarea value={`Shirt 1\n19.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('shirt1', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('shirt1', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('shirt1', 'Shirt 1', 19.99)}>Add to Cart</button>
            </td>
            <td id="item">
              <img src={shirt1} alt="Shirt 2" width="100" />
              <textarea value={`Shirt 2\n24.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('shirt2', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('shirt2', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('shirt2', 'Shirt 2', 24.99)}>Add to Cart</button>
            </td>
            <td id="item">
              <img src={shirt1} alt="Shirt 3" width="100" />
              <textarea value={`Shirt 3\n29.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('shirt3', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('shirt3', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('shirt3', 'Shirt 3', 29.99)}>Add to Cart</button>
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
          <td id="item">
              <img src={sweatshirt} alt="sweatshirt 1" width="100" />
              <textarea value={`sweatshirt 1\n24.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('sweatshirt1', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('sweatshirt1', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('sweatshirt1', 'sweatshirt1', 24.99)}>Add to Cart</button>
            </td>
            <td id="item">
              <img src={sweatshirt} alt="sweatshirt 2" width="100" />
              <textarea value={`sweatshirt 2\n34.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('sweatshirt2', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('sweatshirt2', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('sweatshirt2', 'sweatshirt2', 34.99)}>Add to Cart</button>
            </td>
            <td id="item">
              <img src={sweatshirt} alt="sweatshirt 3" width="100" />
              <textarea value={`sweatshirt 3\n39.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('sweatshirt3', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('sweatshirt3', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('sweatshirt3', 'sweatshirt3', 39.99)}>Add to Cart</button>
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
          <td id="item">
              <img src={sweats} alt="sweats 1" width="100" />
              <textarea value={`sweats 1\n19.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('sweats1', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('sweats1', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('sweats1', 'sweats1', 19.99)}>Add to Cart</button>
            </td>
            <td id="item">
              <img src={sweats} alt="sweats 2" width="100" />
              <textarea value={`sweats 2\n23.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('sweats2', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('sweats2', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('sweats2', 'sweats2', 23.99)}>Add to Cart</button>
            </td>
            <td id="item">
              <img src={sweats} alt="sweats 3" width="100" />
              <textarea value={`sweats 3\n29.99`} readOnly />
              <br />
              <label>Size: </label>
              <select onChange={(e) => handleSizeChange('sweats3', e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <br />
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('sweats3', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('sweats3', 'sweats3', 29.99)}>Add to Cart</button>
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
          <td id="item">
              <img src={hat} alt="hat" width="100" />
              <textarea value={`hat\n9.99`} readOnly />
              <br />
                
             
              <label>Quantity: </label>
              <select onChange={(e) => handleQuantityChange('hat', e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <button onClick={() => handleClick('hat', 'hat', 9.99)}>Add to Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button id = "placeOrder" onClick={placeOrder}>Place Order</button>
    </div>
  );
}


function CreateAccount() {
  const navigate = useNavigate(); //invoke library
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cvv, setCvv] = useState('');
  const [exp, setExp] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username: ', username);
    console.log('Password: ', password);
    console.log('Email: ', email);
    console.log('address: ', address);
    console.log('card no: ', cardNo);
    console.log('cvv: ', cvv);
    console.log('exp: ', exp);
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
        <div className="form-group">
          <label className="form-label"> Enter card #
            <input 
              type="text"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label"> Enter cvv #
            <input 
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label"> Enter exp date
            <input 
              type="text"
              value={exp}
              onChange={(e) => setExp(e.target.value)} />
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
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Assuming successful login redirects to products page
        navigate("/products");
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <Route path="/orderplaced" element={<OrderPlaced />} />
      </Routes>
    </Router>
  );
}

export default App;
