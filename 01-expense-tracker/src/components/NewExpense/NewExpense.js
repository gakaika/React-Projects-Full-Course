import { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css"

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false);
    
    const submitExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData);
    };
    
    const showFormHandler = () => {
        setShowForm(true);
    }

    const hideFormHandler = () => {
        setShowForm(false);
    }

    return (
        <div className="new-expense">
            {showForm && <ExpenseForm onSubmitExpenseData={submitExpenseDataHandler} onHide={hideFormHandler}/>}
            {!showForm && <button type="button" onClick={showFormHandler}>Add New Expense</button>}
        </div>
    );
};

export default NewExpense;