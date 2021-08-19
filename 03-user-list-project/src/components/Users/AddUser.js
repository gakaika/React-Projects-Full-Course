import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState();
    
    const updateUsernameHandler = (event) => {
        setUsername(event.target.value);
    }
    const updateAgeHandler = (event) => {
        setAge(event.target.value);
    }

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredUsername = username.trim();
        const enteredAge = parseInt(age);

        if (enteredUsername.length === 0){
            setError({
                title: "Invalid Username Input",
                message: "Please enter a non-empty username"
            });
        }
        else if ((enteredAge <= 0) || isNaN(enteredAge)){
            setError({
                title: "Invalid Age Input",
                message: "Please enter a valid age number (non-empty and greater than 0)"
            });
        }
        else {
            props.onAddUser(enteredUsername, enteredAge);
            setUsername("");
            setAge("");
        }
    }
    
    const removeErrorHandler = () => {
        setError();
    }

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onClear={removeErrorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={updateUsernameHandler}/>
                    <label htmlFor="age">Age (years)</label>
                    <input id="age" type="number" value={age} onChange={updateAgeHandler}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
}

export default AddUser;