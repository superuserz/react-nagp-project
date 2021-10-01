import { NavLink } from "react-router-dom"
import classes from './Navbar.module.css'
import * as constants from '../../shared/constants/AppConstants';

function Navbar(props) {


    const isLoggedIn = () => {
        if (sessionStorage.getItem(constants.LOGGED_IN_KEY) === 'true') {
            return true;
        }
        return false;
    }

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to="/register">
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li hidden={isLoggedIn}>
                        <NavLink activeClassName={classes.active} to="/home">
                            Home
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
