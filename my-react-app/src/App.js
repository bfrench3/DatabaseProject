import './App.css';
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

// placeholder, this will become the form to create an account
function CreateAccount() {
  return (
    <div>
      <h2 id = "title">Create Your Account</h2>
      <form>
        <label>Enter your email: 
          <input type="text" />
        </label>
        <label>Shipping Address: 
          <input type = "text" />
        </label>
        <label> Enter a password: 
          <input type = "text" />
        </label>
      </form>
    </div>
  );
}

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
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
      <h1 id="title">Impact Fitness Merchandise Site</h1>
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
      </Routes>
    </Router>
  );
}

export default App;
