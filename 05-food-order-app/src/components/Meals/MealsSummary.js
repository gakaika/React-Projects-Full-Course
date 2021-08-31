import styles from "./MealsSummary.module.css";

const MealsSummary = () => {
    return (
        <section className={styles.summary}>
            <h2>Delicious Meals Available</h2>
            <p>
                Choose your favourite item from our extensive selection of available meals and enjoy!
            </p>
            <p>
                All meals are prepared with high quality ingredients and freshly prepared by our experienced chefs.
            </p>
        </section>
    );
};

export default MealsSummary;