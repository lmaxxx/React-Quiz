import classes from './QuizListItem.module.css'
import {connect} from 'react-redux'
import {ToggleAlert} from "../../store/main_page/main_page_action"

const QuizListItem = props => {
    return (
        <div onClick={props.onToggle.bind(this, props.quiz)} className={classes.QuizListItem}>
            <p className={classes.Name}>{props.name}</p>
            <p className={classes.Creator}><i className="fas fa-user-tie"></i> {props.creator}</p>
            <p className={classes.Date}><i className="fas fa-calendar-alt"></i> {props.date}</p>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: (quiz) => dispatch(ToggleAlert(quiz))
    }
}
 
export default connect(null, mapDispatchToProps) (QuizListItem)