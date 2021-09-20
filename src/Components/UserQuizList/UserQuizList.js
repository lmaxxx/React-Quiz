import classes from './UserQuizList.module.css' 
import {connect} from 'react-redux'
import Navigation from '../Navigation/Navigation'
import PlusButton from '../PlusButton/PlusButton'
import {useEffect} from 'react'
import {CheckData, SetQuizForEditing, CreateQuiz, CheckRemoveQuiz} from '../../store/data/data_action'
import {Redirect} from 'react-router-dom'
import Loader from "react-loader-spinner";
import UserQuiz from '../UserQuiz/UserQuiz'



const UserQuizList =  props => {
    useEffect(() =>  {
        if(props.nickname !== '') props.CheckDATA(props.nickname, props.quiz_list)
    }, [props.nickname])

    if(props.should_render_user_quizes && props.nickname === '') return <Redirect to={`${process.env.PUBLIC_URL}/`} />

    return (
        <div className={classes.UserQuizList}>
            <Navigation />
            <div className={classes.OptionBar}></div>
            <div className={classes.QuizCardsWrapper}>
                {
                    props.should_render_user_quizes ? 
                        props.user_quizes.length > 0 ?
                            props.user_quizes.map(quiz => {
                                return <UserQuiz CheckRemoveQuiz={props.CheckRemoveQUIZ.bind(this, quiz[0])} quiz={quiz} SetQuizForEditing={props.SetQuizForEDITING} />
                            })
                            : <p className={classes.UserQuizAlert}>You don't have any quizes. Let's create them.</p>
                    : 
                    <div className={classes.UserQuizLoaderWrapper}>
                        <Loader
                            type="Grid"
                            color="#fff"
                            height={100}
                            width={100}
                        />
                    </div>
                }

            </div>
            
            <PlusButton onCreate={props.CreateQUIZ.bind(this, props.nickname)} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        nickname: state.auth.nickname,
        user_quizes: state.data.user_quizes,
        quiz_list: state.data.quiz_list,
        should_render_user_quizes: state.data.should_render_user_quizes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CheckDATA: (nickname, data) => dispatch(CheckData(nickname, data)),
        SetQuizForEDITING: quiz => dispatch(SetQuizForEditing(quiz)),
        CreateQUIZ: nickname => dispatch(CreateQuiz(nickname)),
        CheckRemoveQUIZ: code => dispatch(CheckRemoveQuiz(code))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (UserQuizList)