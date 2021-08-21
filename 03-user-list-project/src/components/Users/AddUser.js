import { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
    // using refs here for alternate to state managing the input field values
    const usernameInputRef = useRef();
    const ageInputRef = useRef();
    
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();

        const enteredUsername = usernameInputRef.current.value.trim();
        const enteredAge = parseInt(ageInputRef.current.value);

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
            
            // using refs to reset value, allowable in this case as only trivially resetting input fields
            // but only rarely use refs to manipulate dom
            usernameInputRef.current.value = "";
            ageInputRef.current.value = "";
        }
    }
    
    const removeErrorHandler = () => {
        setError();
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onClear={removeErrorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={usernameInputRef}/>
                    <label htmlFor="age">Age (years)</label>
                    <input id="age" type="number" ref={ageInputRef}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    );
}

export default AddUser;