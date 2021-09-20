import classes from './ActiveQuizWrapper.module.css'
import ActiveQuiz from '../ActiveQuiz/ActiveQuiz'
import {createContext, useEffect} from 'react'
import {connect} from 'react-redux'
import {Transition} from 'react-transition-group'
import QuizChooseAlert from '../QuizChooseAlert/QuizChooseAlert'
import {StartTimer, GetQuizFromStorage} from '../../store/active_quiz/active_quiz_action'
import {Redirect} from 'react-router-dom'

export const QuizInfo = createContext()

const ActiveQuizWrapper = props => {
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("active-quiz"))?.start_time === 0) {
            props.getQuizFromStorage()
            props.startTimer()
        } else props.getQuizFromStorage()
    } ,[])

    if(JSON.parse(localStorage.getItem("active-quiz"))) {
        return (
            <QuizInfo.Provider value={props.active_quiz}>
                    <div className={classes.ActiveQuizWrapper}>
                        {
                            Object.keys(props.active_quiz).length ? 
                            <>
                            <ActiveQuiz />
                            <Transition
                                in={props.active_quiz.show_choose_alert}
                                timeout={1}
                            >
                            {state => <QuizChooseAlert animateClass={state} />}     
                            </Transition>
                            </>
                            : null
                        }
                    </div>
            </QuizInfo.Provider>
        )
    } 
    return <Redirect to={`${process.env.PUBLIC_URL}/`} /> 

}

function mapStateToProps(state) {
    return {
        active_quiz: state.active_quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startTimer: () => dispatch(StartTimer()),
        getQuizFromStorage: () => dispatch(GetQuizFromStorage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ActiveQuizWrapper)

