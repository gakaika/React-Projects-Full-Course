import ExpenseItem from "./ExpenseItem";

import "./ExpensesList.css";

const ExpensesList = (props) => {
    const expenses = props.items.map(item => <ExpenseItem key={item.id} title={item.title} amount={item.amount} date={item.date} />);

    if (expenses.length === 0){
        return <h2 className="expenses-list__fallback">No Expenses Found</h2>;
    }

    return (
        <ul className="expenses-list">
            {expenses}
        </ul>
    );
};

export default ExpensesList;