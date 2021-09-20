import classes from './PlusButton.module.css'
import {NavLink} from 'react-router-dom'

const PlusButton = props => {
    return (
        <NavLink to={`${process.env.PUBLIC_URL}/constructor`} onClick={props.onCreate} className={classes.AddQuiz}>
            <div className={classes.PlusWrapper}>
                <div></div>
                <div></div>
            </div>
        </NavLink>
    )
}
 
export default PlusButton;