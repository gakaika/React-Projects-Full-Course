import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    
    const cartItems = cartCtx.items.map(item => (
        <CartItem 
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={() => cartCtx.addItem({...item, amount: 1})}
            onRemove={() => cartCtx.removeItem(item.id)}
        />
    ));

    return (
        <Modal onHide={props.onHideCart}>
            <ul className={styles["cart-items"]}>{cartItems}</ul>
            <div className={styles.total}>
                <span>Total Amount:</span>
                <span>${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles["button--alt"]} onClick={props.onHideCart}>Close</button>
                {(cartCtx.items.length > 0) && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;