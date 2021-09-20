import {QuizInfo} from '../ActiveQuizWrapper/ActiveQuizWrapper'
import {useContext} from 'react'
import QuizAnswer from '../QuizAnswer/QuizAnswer'

const QuizAnswers = (props) => {
    const quiz = useContext(QuizInfo)

    return (
        <div>
            {
                quiz.tasks[quiz.active_task].answers.map(answerItem => {
                    return <QuizAnswer answer={answerItem.answer} key={answerItem.answer_id}  answerId={answerItem.answer_id} trueId={quiz.tasks[quiz.active_task].true_id} />
                })
            }
        </div>
    )
}

 
export default QuizAnswers