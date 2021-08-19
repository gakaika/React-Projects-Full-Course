import Card from "../UI/Card";

import styles from "./UsersList.module.css";

const UsersList = (props) => {
    return (
        <Card className={styles.users}>
            <ul>
                {props.users.map(user => <li key={user.id}>{user.name} ({user.age} years old)</li> )}
                {(props.users.length === 0) && <h3 className={styles.no_users}>No Users Added Yet</h3>}
            </ul>
        </Card>
    );
}

export default UsersList;