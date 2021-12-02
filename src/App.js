import "./App.css";

// Components
import AddUser from "./components/Users/AddUser/AddUser";
import UsersList from "./components/Users/UsersList/UsersList";

function App() {
  return (
    <div className='App'>
      <AddUser />
      <UsersList users={[]} />
    </div>
  );
}

export default App;
