import './App.css';

function CreateButton(){
  return (
    <button id = "createButton">Create Account</button>
  );
}
function LoginButton(){
  return (
    <button id = "loginButton">Login</button>
  )
}


function App() {
  return (
    <div>
      <h1 id="title">Impact Fitness Merchandise Site </h1>
      <LoginButton />
      <CreateButton />
    </div>
  );
}

export default App;