import './PreStartQuizAlert.css'
import PreStartQuizBackground from '../PreStartQuizBackground/PreStartQuizBackground'
import {connect} from 'react-redux'
import {ToggleAlert} from "../../store/main_page/main_page_action"
import {NavLink} from 'react-router-dom'
import {SetActiveQuiz} from '../../store/active_quiz/active_quiz_action'

const PreStartQuizAlert = props => {
    const transitionStyles = {
        entering: { opacity: 1, transform: "TranslateY(90px)" },
        entered:  { opacity: 1, transform: "TranslateY(90px)"},
        exiting:  { opacity: 0, transform: "TranslateY(0)", },
        exited:  { opacity: 0, transform: "TranslateY(0)", zIndex: -1},
    }
    
    let buttonText
    JSON.parse(localStorage.getItem("active-quiz"))?.name === props.quiz.name ? buttonText = "Continue" : buttonText = "Start"

    return (
        <>
        <div style={transitionStyles[props.animClass]} className="PreStartQuizAlert">
            <i onClick={props.onToggle.bind(this, "")} className="fas fa-times CloseIcon"></i>
            <div className="RowWrapper">
                <p className="Param">{props.quiz.name}</p>
                <p className="Param">{props.quiz?.tasks?.length}</p>
            </div>
            <div style={{marginTop: "20px"}} className="RowWrapper">
                <p className="Param"><i className="fas fa-user-tie"></i> {props.quiz.creator_name}</p>
                <p style={{whiteSpace: "nowrap"}} className="Param"><i className="fas fa-calendar-alt"></i> {props.quiz.create_date}</p>
            </div>
            <NavLink onClick={props.startQuiz.bind(this, props.quiz)} to={`${process.env.PUBLIC_URL}/quiz`}><button className="StartButton" type="button">{buttonText}</button></NavLink> 
        </div>
        <PreStartQuizBackground />
        </>
    )

}

function mapStateToProps(state) {
    return {
        quiz: state.main_page.alert_options
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: (smth) => dispatch(ToggleAlert(smth)),
        startQuiz: quiz => dispatch(SetActiveQuiz(quiz))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (PreStartQuizAlert)