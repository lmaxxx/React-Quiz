import classes from './ConstructorAnswer.module.css'

const ConstructorAnswer = props => {
    return (
        <div key={props.answer_id} className={classes.ConstructorAnswer}>
            <p className={classes.Label}>Answer {props.answer_id + 1}:</p>
            <input onChange={props.SetAnswerValue} type="text" value={props.answer_value} />
            <i onClick={props.RemoveAnswer} className={[classes.RemoveAnswer, "fas", "fa-times"].join(" ")}></i>
        </div>
    )
}
 
export default ConstructorAnswer;