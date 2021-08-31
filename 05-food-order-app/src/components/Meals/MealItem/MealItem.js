import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addItemHandler = (amount) => {
        cartCtx.addItem({id: props.id, name: props.name, price: props.price, amount: amount});
    }
    
    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{`$${props.price.toFixed(2)}`}</div>
            </div>
            <MealItemForm id={props.id} onAddToCart={addItemHandler}/>
        </li>
    );
};

export default MealItem;