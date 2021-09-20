import classes from './PreStartQuizBackground.module.css'
import {connect} from 'react-redux'
import {ToggleAlert} from "../../store/main_page/main_page_action"

const PreStartQuizBackground = props => {
    return props.show_alert ? <div onClick={props.onToggle.bind(this, "")} className={classes.PreStartQuizBackground}></div> : null
}
 
function mapStateToProps(state) {
    return {
        show_alert: state.main_page.show_alert
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: (smth) => dispatch(ToggleAlert(smth))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PreStartQuizBackground)