import ReactDOM from "react-dom";
import styles from "./Modal.module.css"

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onHide}/>;
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            {props.children}
        </div>
    );
}

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onHide={props.onHide}/>, document.getElementById("overlays"))}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                document.getElementById("overlays")
            )}
        </>
    );
};

export default Modal;