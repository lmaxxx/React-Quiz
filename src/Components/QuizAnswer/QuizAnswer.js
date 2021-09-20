import classes from './QuizAnswer.module.css'
import {CheckSelection} from '../../store/active_quiz/active_quiz_action'
import {connect} from 'react-redux'
import {useContext} from 'react'
import {QuizInfo} from '../ActiveQuizWrapper/ActiveQuizWrapper'

const QuizAnswer = (props) => {
    const quiz = useContext(QuizInfo)
    
    if(quiz.disable_buttons) return <p className={classes.QuizAnswer}>{props.answer}</p>
    else return <p className={classes.QuizAnswer} onClick={() => props.onChoose(props.answerId, props.trueId)}>{props.answer}</p>    

}
function mapDispatchToProps(dispatch) {
    return {
        onChoose: (answerId, trueId) => dispatch(CheckSelection(answerId, trueId))
    }
}
 
export default connect(null, mapDispatchToProps) (QuizAnswer)
