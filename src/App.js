import ActiveQuizWrapper from './Components/ActiveQuizWrapper/ActiveQuizWrapper'
import {Switch, Route} from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'
import Auth from './Components/Auth/Auth'
import 'antd/dist/antd.css'
import {connect} from 'react-redux'
import {checkUserUrlInLocalStorage} from './store/auth/auth_action'
import {useEffect} from 'react'
import Navigation from './Components/Navigation/Navigation'
import UserQuizList from './Components/UserQuizList/UserQuizList'
import QuizConstructor from './Components/QuizConstructor/QuizConstructor'

function App(props) {
  useEffect(() => props.checkUserUrlInLocalSTORAGE() ,[])
  return (

    <Switch >
      <Route path={`${process.env.PUBLIC_URL}/`} exact component={MainPage}/>
      <Route path={`${process.env.PUBLIC_URL}/auth`} component={Auth} />
      <Route path={`${process.env.PUBLIC_URL}/quiz`} component={ActiveQuizWrapper}/>
      <Route path={`${process.env.PUBLIC_URL}/my-quizes`} component={UserQuizList}/>
      <Route path={`${process.env.PUBLIC_URL}/constructor`} component={QuizConstructor}/>
    </Switch>       
  
  )
}

function mapDispatchToProps(dispatch) {
  return  {
    checkUserUrlInLocalSTORAGE: () => dispatch(checkUserUrlInLocalStorage())
  }
}

export default connect(null, mapDispatchToProps) (App)