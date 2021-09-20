import {useContext, useEffect} from 'react'
import {QuizInfo} from '../ActiveQuizWrapper/ActiveQuizWrapper'
import {connect} from 'react-redux'
import {EndTimer} from '../../store/active_quiz/active_quiz_action'
import classes from './QuizResult.module.css'
import {NavLink} from 'react-router-dom'


const QuizResult = (props) => {
    const quiz = useContext(QuizInfo)
    useEffect(() => {
        if(props.quiz_end_time === 0) {
            props.endTimer()
        }
    }, [])
    const time = quiz.end_time / 1000 - quiz.start_time / 1000
    const truePercent = quiz.true_answers / quiz.tasks.length * 100
    let styleForGreen = {width: truePercent + '%'}

    if(props.quiz_end_time !== 0) {
        localStorage.setItem("active-quiz", JSON.stringify(quiz))
    }    
    
    if(truePercent === 100 || truePercent === 0) styleForGreen = {...styleForGreen, border: "0", borderRadius: "6px"}
    return ( 
        <div className={classes.QuizResult}>
            <h1 className={classes.QuizTitle}>{quiz.name}</h1>
            <div className={classes.PrecisionWrapper}>
                <p className={classes.Precision}>Precision</p>
                <div className={classes.Wrong}>
                    <div style={styleForGreen} className={classes.Truth}>
                        {truePercent >= 15 ? <p style={{fontSize: '27px'}}>{truePercent.toFixed(1)}%</p> : null}
                    </div>
                </div>
            </div>
            <p className={classes.Rating}>Rating: <strong className={classes.Res}>{quiz.true_answers}/{quiz.tasks.length}</strong></p>
            <div className={classes.TimeWrapper}>
                <p>Time: <strong className={classes.Res}>{(~~time).toFixed(1)}s</strong></p>
                <p>Average question time: <strong className={classes.Res}>{(~~time / quiz.tasks.length).toFixed(1)}s</strong></p>
            </div>
            <NavLink to={`${process.env.PUBLIC_URL}/`} ><button className={classes.BackButton}>Go back</button></NavLink>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        quiz_end_time: state.active_quiz.end_time
    }
}

function mapDispatchToProps(dispatch) {
    return {
        endTimer: () => dispatch(EndTimer()),
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (QuizResult)