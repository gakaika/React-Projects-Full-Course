import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'French Fries',
    description: 'Crispy, fresh, and irresistable',
    price: 9.99,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy and green',
    price: 18.99,
  }
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((item) => (
    <MealItem 
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}/>
  ));
  
  return (
    <section className={styles.meals}>
        <Card>
          <ul>
            {mealsList}
          </ul>
        </Card>
    </section>
  );
};

export default AvailableMeals;