import { useState } from "react";

import "./ExpenseForm.css"

const ExpenseForm = (props) => {
    // The below comments are an alternate to the single object state used
    // const [enteredTitle, setEnteredTitle] = useState("");
    // const [enteredAmount, setEnteredAmount] = useState("");
    // const [enteredDate, setEnteredDate] = useState("");

    const [userInput, setUserInput] = useState({
        title: "",
        amount: "",
        date: ""
    });
    
    const titleChangeHandler = (event) => {
        // setEnteredTitle(event.target.value);
        setUserInput((prevState) => {
            return { ...prevState, title: event.target.value };
        });
    };

    const amountChangeHandler = event => {
        // setEnteredAmount(event.target.value);
        setUserInput((prevState) => {
            return { ...prevState, amount: event.target.value };
        });
    };

    const dateChangeHandler = event => {
        // setEnteredDate(event.target.value);
        setUserInput((prevState) => {
            return { ...prevState, date: event.target.value };
        });
    };
    
    const submitHandler = (event) => {
        event.preventDefault();
        const expenseData = {title: userInput.title, amount: parseFloat(userInput.amount), date: new Date(userInput.date)};
        
        // If valid data is received, submit it
        if ((expenseData.title !== "") && (expenseData.amount >= 0.01) && (userInput.date !== "")) {
            
            props.onSubmitExpenseData(expenseData);

            // effectively clears the input fields due to 2 way binding
            setUserInput({
                title: "",
                amount: "",
                date: ""
            });

            props.onHide();
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={userInput.title} onChange={titleChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={userInput.amount} onChange={amountChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" max="2025-12-31" value={userInput.date} onChange={dateChangeHandler}/>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.onHide}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;