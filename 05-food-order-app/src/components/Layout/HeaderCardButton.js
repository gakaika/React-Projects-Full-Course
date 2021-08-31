import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
    const [btnAnimate, setButtonAnimate] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);

    const btnClasses = `${styles.button} ${btnAnimate && styles.bump}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setButtonAnimate(true);
        
        const timer = setTimeout(() => {
            setButtonAnimate(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items]);


    return (
        <button className={btnClasses} onClick={props.onClickCart}>
            <span className={styles.icon}>  
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCardButton;