import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import styles from "./ErrorModal.module.css";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClear}/>;
}

const ModalOverlay = (props) => {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button onClick={props.onClear}>Ok</Button>
            </footer>
        </Card>
    );
}

const ErrorModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClear={props.onClear}/>, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onClear={props.onClear}/>, document.getElementById("overlay-root"))}
        </>
    );
};

export default ErrorModal;