import classes from './QuizConstructor.module.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {SetInpurValueInConstructor, CheckConstructorForSaving, AddAnswer, ChangeTrueAnswer, RemoveItemFromConstructor, AddTask} from '../../store/data/data_action'
import ConstructorAnswer from '../ConstructorAnswer/ConstructorAnswer'

const QuizConstructor = props => {
    if(!props.should_render_constructor) return <Redirect to={`${process.env.PUBLIC_URL}/my-quizes`} />
    if(props.redirect_from_constructor) return <Redirect to={`${process.env.PUBLIC_URL}/my-quizes`} />

    return ( 
        <div className={classes.QuizConstructor}>
            <div className={[classes.InputRow, classes.Name].join(" ")}>
                <p className={classes.Label}>Name:</p>
                <input onChange={(e) => props.SetInpurValueInCONCTRUCTOR(null, null, e, false, true)} type="text" value={props.editing_quiz[1].name} />
            </div>
            {
                props?.editing_quiz[1]?.tasks.map((question, question_id) => {
                    return (<div key={question_id} className={classes.QuestionWrapper}>
                            <div style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px", marginTop: "25px"}}>
                                <p className={classes.TaskNumber}>Task {question_id + 1}</p>
                                <i className={["fas", "fa-times-circle", classes.RemoveTask].join(" ")} onClick={() => props.RemoveItemFromCONSTRUCTOR(question_id, null)}></i>
                            </div>
                            <div className={[classes.InputRow, classes.Question].join(" ")}>
                                <p className={classes.Label}>Question:</p>
                                <input onChange={(e) => props.SetInpurValueInCONCTRUCTOR(question_id, null, e, true)} type="text" value={question.task_text} />
                            </div>
                             {
                                question.answers.map(answer => {
                                    return (
                                        <ConstructorAnswer 
                                            answer={answer} 
                                            answer_id={answer.answer_id}
                                            answer_value={answer.answer}
                                            SetAnswerValue={(e) => props.SetInpurValueInCONCTRUCTOR(question_id, answer.answer_id, e, false)}  
                                            RemoveAnswer={() => props.RemoveItemFromCONSTRUCTOR(question_id, answer.answer_id)}
                                        />
                                    )
                                })
                             }
                             {
                                question.answers.length < 8 ? <div className={classes.AddAnswer} onClick={props.AddANSWER.bind(this, question_id)}>Add answer</div> : null
                             }
                             
                             <div className={classes.InputRow}>
                                <p className={classes.Label}>True answer:</p>
                                <select onChange={(e) => props.ChangeTrueANAWER(question_id, e)}>
                                    {
                                        question.answers.map(answer => {
                                            return answer.answer_id === question.true_id ?
                                            <option selected value={answer.answer_id + 1}>{answer.answer_id + 1}</option>
                                            :
                                            <option value={answer.answer_id + 1}>{answer.answer_id + 1}</option>
                                        })
                                    }
                                </select>
                            </div>
                            {
                                question_id === props?.editing_quiz[1]?.tasks.length - 1 ? 
                                <div className={classes.AddTaks} onClick={props.AddTASK}>
                                    <i className="fas fa-plus"></i>
                                </div> : null
                            }

                            </div>)
                })
            }
            {
                props.save_constructor_changes ? <button className={classes.Save} onClick={props.CheckConstructorForSAVING.bind(this, props.editing_quiz)}>Save</button> : null
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        editing_quiz: state.data.editing_quiz,
        should_render_constructor: state.data.should_render_constructor,
        save_constructor_changes: state.data.save_constructor_changes,
        redirect_from_constructor: state.data.redirect_from_constructor
    }
}

function mapDispatchToProps(dispatch) {
    return {
        SetInpurValueInCONCTRUCTOR: (task_id, answer_id, e, changeTask, changeName) => dispatch(SetInpurValueInConstructor(task_id, answer_id, e, changeTask, changeName)),
        CheckConstructorForSAVING: editing_quiz => dispatch(CheckConstructorForSaving(editing_quiz)),
        AddANSWER : task_id => dispatch(AddAnswer(task_id)),
        ChangeTrueANAWER: (task_id, e) => dispatch(ChangeTrueAnswer(task_id, e)),
        RemoveItemFromCONSTRUCTOR: (task_id, answer_id) => dispatch(RemoveItemFromConstructor(task_id, answer_id)),
        AddTASK: () => dispatch(AddTask())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps) (QuizConstructor)