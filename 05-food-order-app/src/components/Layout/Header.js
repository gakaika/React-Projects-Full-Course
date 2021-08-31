import HeaderCardButton from "./HeaderCardButton";
import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";

const Header = (props) => {
    return (
        <>
            <header className={styles.header}>
                <h1>Food Express</h1>
                <HeaderCardButton onClickCart={props.onClickCart}/>
            </header>
            <div className={styles["main-image"]}>
                <img src={mealsImage} alt="Table of Food"/>
            </div>
        </>
    );
}

export default Header;