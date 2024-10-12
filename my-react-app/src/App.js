import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
//second import uses navigation to change pages

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
      <h2>Create Your Account</h2>
    </div>
  );
}
function Login(){
  return (
    <div>
      <h2>Login</h2>
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
