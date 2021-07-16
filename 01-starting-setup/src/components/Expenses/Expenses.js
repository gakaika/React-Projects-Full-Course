import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
    const expenseItems = props.items.map((item) => <ExpenseItem title={item.title} amount={item.amount} date={item.date} />);
    return (
        <Card className="expenses">
            {expenseItems}
        </Card>
    );
}

export default Expenses;