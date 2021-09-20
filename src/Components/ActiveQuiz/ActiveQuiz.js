import classes from './ActiveQuiz.module.css'
import {useContext} from 'react'
import {QuizInfo} from '../ActiveQuizWrapper/ActiveQuizWrapper'
import QuizAnswres from '../QuizAnswers/QuizAnswers'
import QuizResult from '../QuizResult/QuizResult'

const ActiveQuiz = (props) => {
    const quiz = useContext(QuizInfo)

    return (
        <div className={classes.ActiveQuiz}>
            {
                quiz.tasks.length !== quiz.active_task ?
                <>
                    <div className={classes.Task}>
                        <p className={classes.Number}>{quiz.active_task + 1}/{quiz.tasks.length}.</p>&nbsp;
                        <p className={classes.TaskText}> {quiz.tasks[quiz.active_task].task_text}</p> 
                    </div>
                    <QuizAnswres />
                </> 
                :
                <QuizResult />
            }
        </div>
    )
}
 
export default ActiveQuiz