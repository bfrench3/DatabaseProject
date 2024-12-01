// NEXT STEPS: CHECK AGAINST DATABASE FOR CART ITEMS, CREATING AN ACCOUNT AND ORDER PLACED
import './App.css';
import shirt1 from './shirt.jpg';
import sweatshirt from './sweatshirt.jpg';
import sweats from './sweats.jpg';
import hat from './hat.webp';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
//second import uses navigation to change pages
import React, { useEffect, useState } from 'react';


//function for both buttons, either create or login
function LoginButtons() {
  const navigate = useNavigate(); // for navigating between pages

  function handleClickCreate() {
    navigate("/create-account"); // navigates in the url to localhost:3000/create-account
  }
  function handleClickLogin() {
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


function OrderPlaced() {
  const [orderNo, setOrderNo] = useState(0); // State to store the order number
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  /*
  const fetchOrderNo = async () => {
    try {
      if (!username) {
        console.error('No username found in localStorage');
        return;
      }

      const response = await fetch('http://localhost:5005/api/cart/orderNo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      console.log('Response Status:', response.status); // Log the response status

      if (!response.ok) {
        throw new Error(`Failed to fetch order number: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response Data:', data);

      if (data && data.orderNo) {
        setOrderNo(data.orderNo); // Store order number in state
        console.log('Order Number:', data.orderNo);
      } else {
        console.error('Order number not found in response');
      }
    } catch (error) {
      console.error('Error fetching order number:', error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchOrderNo();
    } else {
      console.log('User not logged in');
      navigate('/login');
    }
  }, [username, navigate]);
*/
  function continueShopping() {
    navigate('/products');
  }

  return (
    <div>

      <h1>Congrats! your order has been placed!</h1>
      <button id="continue" onClick={continueShopping}>Continue shopping</button>
    </div>
  );
}



//working
function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const username = localStorage.getItem('username'); //username is stored locally, easiest way to pull it.
  //
  const fetchCartItems = async () => { //when navigated to this page, this method is invoked that fetches all items in this users cart, in this session
    try {
      const response = await fetch(`http://localhost:5005/api/cart/${username}`, { //gets from this endpoint
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json(); //data is what we got from that endpoint
      console.log(data); // log the data for debugging
      if (Array.isArray(data) && data.length > 0) { //checks that there are items in the cart, so that they get set as those items
        setCartItems(data);
      } else {
        console.log("No items in cart"); //if nothing in the cart, display this
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  //this formats the total cost correctly
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    setTotalCost(total);
  }, [cartItems]);

  //fetch when component mounts (loads)
  useEffect(() => {
    if (username) {
      fetchCartItems(username);
    } else {
      console.log('User not logged in');
      // if cant find username for some reason (this should never happen)
      navigate('/login'); //if it did, navigate to login
    }
  }, [username, navigate]);

  function handlePurchase() {
    if (cartItems.length === 0) {
      alert("There's nothing in your cart!");
    }
    else {
      //handleClearCart();
      navigate("/orderplaced");
    }

  }

  function continueShopping() {
    navigate("/products");
  }

  const handleClearCart = async () => {
    //get the username from local storage
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('No user logged in');
      return;
    }
    try { //go to this endpoint, and DELETE
      const response = await fetch(`http://localhost:5005/api/cart/clear?username=${username}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      const result = await response.json(); //get the data from the delete call at the endpoint
      setCartItems([]); //set cart to empty
      console.log(result.message);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  //heres the react for the cart component
  return (
    <div id="cart-container">
      <h1 id="cart-title">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div id="cart-items">
          {cartItems.map((item) => (
            <div key={item.orderID} className="cart-item">
              <p id={`item-title-${item.orderID}`} className="cart-item-title">
                Item: {item.title}
              </p>
              <p id={`item-price-${item.orderID}`} className="cart-item-price">
                Price: ${parseFloat(item.price).toFixed(2)}
              </p>
              <p id={`item-size-${item.orderID}`} className="cart-item-size">
                Size: {item.size}
              </p>
              <p id={`item-quantity-${item.orderID}`} className="cart-item-quantity">
                Quantity: {item.quantity}
              </p>
            </div>
          ))}
          <h2 id="total-cost">Total cost: ${totalCost.toFixed(2)}</h2>
        </div>
      ) : (
        <p id="empty-cart-message">Your cart is empty</p>
      )}
      <button id="continue" onClick={continueShopping}>Continue shopping</button>
      <button id="order" onClick={handlePurchase}>Place order</button>
      <button id="clear-cart" onClick={handleClearCart}>Clear cart</button>
    </div>
  );

}

//currently works correctly. 
function Products() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});
  //these selecteds are for the components that dont hold a value, but they are selects

  //get the values from the selections
  const handleSizeChange = (id, size) => {
    setSelectedSize(prev => ({ ...prev, [id]: size }));
  };
  const handleQuantityChange = (id, quantity) => {
    setSelectedQuantity(prev => ({ ...prev, [id]: quantity }));
  };
  function placeOrder() {
    navigate("/orderplaced");
  }
  //gets invoked upon an item getting added to cart
  const handleClick = async (id, title, price) => {
    const size = selectedSize[id] || 'S'; // Default size to 'S' if not changed
    const quantity = selectedQuantity[id] || 1; // Default quantity to 1 if not changed
    //log the item components
    console.log('Sending item to cart with: ', { id, title, price, size, quantity });
    try {
      const username = localStorage.getItem('username'); //get username from local
      if (username) { //need the username to send the rest of the data
        const body = {
          username,
          product_id: id,
          quantity,
          price,
          size,
          title, //heres all the facets of the product you selected
        };
        //this if makes sure we have everything from our req body
        if (body.username && body.product_id && body.quantity && body.price && body.size && body.title) {
          const response = await fetch('http://localhost:5005/api/cart', { //this sends this product to cart, response is the confirmation 200
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), //de json the info
          });
          //
          if (response.ok) {
            const result = await response.json();
            console.log(result.message); //added to order
            navigate("/cart"); // Navigate to cart page to see new item in cart
          } else {
            const error = await response.json();
            console.error(error.message); // Error adding to cart
          }
        } else {
          console.error('One or more fields are missing:', body);
        }
      } else {
        console.error('User not logged in');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  //products html section
  return (
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
              <button onClick={() => handleClick(1, 'Shirt 1', 19.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(2, 'Shirt 2', 24.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(3, 'Shirt 3', 29.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(4, 'sweatshirt1', 24.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(5, 'sweatshirt2', 34.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(6, 'sweatshirt3', 39.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(7, 'sweats1', 19.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(8, 'sweats2', 23.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(9, 'sweats3', 29.99)}>Add to Cart</button>
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
              <button onClick={() => handleClick(10, 'hat', 9.99)}>Add to Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button id="placeOrder" onClick={placeOrder}>Place Order</button>
    </div>
  );
}
//create now works too
function CreateAccount() {
  const navigate = useNavigate(); //invoke library
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [exp, setExp] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/api/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, cardNumber, cvv, exp }),
      });

      // Check if the response is okay (status code in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error response
        console.error('Error Response:', errorData); // Log the error response
        setError(errorData.message || 'User creation failed');
        return;
      }

      // If response is okay, parse the JSON data
      const data = await response.json();
      console.log('Success:', data);

      // Navigate to login page if user creation is successful
      navigate("/login");

    } catch (error) {
      // Catch and log errors related to the fetch request (e.g., network errors)
      console.error('Error:', error);
      setError('An error occurred during user creation.');
    }
  };




  return (
    <div>
      <h2 id="title">Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Enter your email:
            <input type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Shipping Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Enter a username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label"> Enter a password:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label"> Enter card #
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)} />
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
        <input type="submit" id="submitButton" value="create" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
//login page, SUCCESSFULLY CHECKS AGAINST MYSQL
function Login() {
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
        credentials: 'include' // Ensure cookies are sent
      });

      // Handle response after awaiting
      const data = await response.json();

      if (response.ok) {
        // Assuming successful login redirects to products page
        localStorage.setItem('username', username);
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" id="submitButton" value="Login" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// landing page
function Home() {
  return (
    <div>
      <h1 id="title">Impact Strength Club Merchandise Site</h1>
      <LoginButtons />
    </div>
  );
}

// parent of all, has routes etc.
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
