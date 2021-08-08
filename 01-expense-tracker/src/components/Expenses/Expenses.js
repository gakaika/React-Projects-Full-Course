import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import { useState } from "react";

import "./Expenses.css";

const Expenses = (props) => {
    const [filterYear, setFilterYear] = useState("2021");
    
    const updateFilterYear = (newYear) => {
        setFilterYear(newYear);
    }
    
    const filteredExpenses = props.items.filter(item => item.date.getFullYear().toString() === filterYear );
    
    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter selected={filterYear} onUpdate={updateFilterYear} />
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesList items={filteredExpenses} />
            </Card>
        </div>
    );
}

export default Expenses;