import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
    items: [],
    totalAmount: 0
};

const cartReducer = (prevState, action) => {
    if (action.type === "ADD_ITEM"){
        let updatedItems;
        const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.item.id);
        if (existingCartItemIndex !== -1){
            // means that the item exists already, so increment its amount
            updatedItems = [...prevState.items];
            updatedItems[existingCartItemIndex].amount += action.item.amount;
        }
        else {
            updatedItems = prevState.items.concat(action.item);
        }

        const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    else if (action.type === "REMOVE_ITEM"){
        const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.id);
        const updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex].amount -= 1;

        const updatedTotalAmount = prevState.totalAmount - updatedItems[existingCartItemIndex].price;

        if (updatedItems[existingCartItemIndex].amount === 0) {
            updatedItems.splice(existingCartItemIndex, 1);
        };

        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    else {
        return defaultCart;
    }
};

const CartProvider = (props) => {    
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

    const addItemHandler = (item) => {
        dispatchCartAction({type: "ADD_ITEM", item: item});
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({type: "REMOVE_ITEM", id: id});
    };
    
    return (
        <CartContext.Provider value={{
            items: cartState.items,
            totalAmount: cartState.totalAmount,
            addItem: addItemHandler,
            removeItem: removeItemHandler
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;