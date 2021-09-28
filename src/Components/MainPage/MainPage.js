import classes from './MainPage.module.css'
import Navigation from '../Navigation/Navigation'
import SearchForm from '../SearchForm/SearchForm'
import QuizList from '../QuizList/QuizList'
import {connect} from 'react-redux'
import {GetData} from '../../store/data/data_action'
import {useEffect} from 'react'
import PreStartQuizAlert from '../PreStartQuizAlert/PreStartQuizAlert'
import {Transition} from 'react-transition-group'

const MainPage = props => {
    useEffect(() => props.getData(), [])

    return (
        <div className={classes.MainPage}>
            <Navigation />
            <Transition  timeout={500} in={props.show_alert} >{state => <PreStartQuizAlert animClass={state} />}</Transition>
            <h1 className={classes.Title}><strong>Create</strong> and <strong>perfom</strong> quizzes yourself.<br></br><strong>SpireTest</strong> for <strong>everyone</strong></h1>
            <SearchForm />
            <QuizList />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        show_alert: state.main_page.show_alert
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getData: () => dispatch(GetData())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (MainPage)