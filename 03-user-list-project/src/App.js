import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersData, setUsersData] = useState([]);
  
  const newUserHandler = (username, userAge) => {
    setUsersData(prevState => {
      return [...prevState, {name: username, age: userAge, id: Math.random().toString()}];
    });
  }

  return (
    <div>
      <AddUser onAddUser={newUserHandler}/>
      <UsersList users={usersData}/>
    </div>
  );
}

export default App;
