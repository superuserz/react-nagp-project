import { NavLink } from "react-router-dom";
import classes from './Navbar.module.css'

function Navbar(props) {



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
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
