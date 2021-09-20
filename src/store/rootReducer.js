import { combineReducers } from 'redux'
import active_quiz from './active_quiz/active_quiz_reducer'
import navigation from './navigation/navigation_redcer'
import data from './data/data_reducer'
import main_page from './main_page/main_page_reducer'
import auth from './auth/auth_reducer' 

export default combineReducers({
    active_quiz,
    navigation,
    data,
    main_page,
    auth,
})