import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = parseInt(amountInputRef.current.value);
        
        if ((enteredAmount >= 1) && (enteredAmount <= 20)) {
            props.onAddToCart(enteredAmount);
            setAmountIsValid(true);
        } 
        else {
            setAmountIsValid(false);
        }
    };
    
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={amountInputRef} input={{
                type: "number",
                id: `amount_${props.id}`,
                min: "1",
                max: "20",
                step: "1",
                defaultValue: "1"
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please Enter a Avalid Amount (1-20)</p>}
        </form>
    );
};

export default MealItemForm;