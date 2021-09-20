import classes from './QuizChooseAlert.module.css'
import {QuizInfo} from '../ActiveQuizWrapper/ActiveQuizWrapper'
import {useContext} from 'react'

const QuizChooseAnimation = props => {
    const cls = [classes.QuizChooseAnimation]
    const quiz = useContext(QuizInfo)
    
    quiz.choose_alert_state ? cls.push(classes.TrueAnswer) : cls.push(classes.FalseAnswer)

    let style = {}
    
    switch(props.animateClass) {
        case "entering": style = {top: "-100vh"} 
        break
        case "entered": style = {top: "100vh"} 
        break
        case "exiting": style = {top: "-100vh"} 
        break
        case "exited": style = {top: "-100vh"} 
        break
        default: return null
    }

    return ( 
        <div style={style} className={cls.join(" ")}></div>
    )
}


 
export default QuizChooseAnimation;