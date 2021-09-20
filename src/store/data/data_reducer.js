import {message} from 'antd'
import axios from 'axios'
import _, { isEqual } from 'underscore'

const initialState = {
    save_constructor_changes: false,
    quiz_list: [],
    sorted_quiz_list: [],
    search_input_text: "",
    search_result_text: "",
    should_render_user_quizes: false,
    user_quizes: [],
    editing_quiz: [],
    should_render_constructor: false,
    error: false,   
    createing_quiz: false,
    redirect_from_constructor: false
}

export default function data(state = initialState, action) {
    switch(action.type) {
        case "GET_QUIZES_FROM_DB":
            const data = Object.entries(action.payload).reverse()
            return {quiz_list: data, sorted_quiz_list: data}

        case "READ_QUIZ_INPUT_MAIN_PAGE":  return {...state, search_input_text: action.payload}

        case "SEARCH_QUIZ_FROM_LIST_BY_NAME": 
            action.paylaod.preventDefault()
            if(!state.search_input_text) {
                message.error({
                    content: `Search form can't be empty`,
                    duration: 2.8,
                    className: 'search-empty-error'
                })
                return {...state}
            } else {
                const sortList = state.quiz_list.filter(item => item[1].name.toLowerCase().includes(state.search_input_text.toLowerCase()))

                return sortList.length ? 
                {...state, error: false, sorted_quiz_list: sortList, search_result_text: state.search_input_text, search_input_text: ""}
                :
                {...state, error: true, sorted_quiz_list: sortList, search_result_text: state.search_input_text, search_input_text: ""}
            }

        case "DELETE_QUIZ_FORM_RESULT" : 
            return {...state, sorted_quiz_list: state.quiz_list, search_result_text: ""}
        
        case "SET_USER_QUIZES" : 
            const nickname = action.payload
            const quizes = []

            for(const quiz of state.quiz_list) {
                if(quiz[1].creator_name === nickname) {
                    quizes.push(quiz)
                }
            }

            return {...state, user_quizes: quizes, should_render_user_quizes: true}

        case "SET_QUIZ_FOR_EDITING" : 
            localStorage.setItem("quiz-before-editing", JSON.stringify(action.payload))
            return {...state,
                    editing_quiz: action.payload,
                    should_render_constructor: true,
                    redirect_from_constructor: false
                }

        case "SET_INPUT_VALUE_IN_CONSTRUCTOR" : 
            const editing_quiz = [...state.editing_quiz]

            if(action.payload.changeTask) {
                editing_quiz[1].tasks[action.payload.task_id].task_text = action.payload.text
            } 
            else if(action.payload.changeName) {
                editing_quiz[1].name = action.payload.text
            }
            else {
                editing_quiz[1].tasks[action.payload.task_id].answers[action.payload.answer_id].answer = action.payload.text
            }


            if(_.isEqual(editing_quiz, JSON.parse(localStorage.getItem("quiz-before-editing")))) {
                return {...state, editing_quiz: editing_quiz, save_constructor_changes: false}
            } else return {...state, editing_quiz: editing_quiz, save_constructor_changes: true}

        case "ADD_ANSWER":
            const copyEditing_quiz = [...state.editing_quiz]
            const newAnswerId = copyEditing_quiz[1].tasks[action.payload].answers.length
            copyEditing_quiz[1].tasks[action.payload].answers.push({answer: "", answer_id: newAnswerId})
        
            return {...state, editing_quiz: copyEditing_quiz}

        case "SAVE_CONSTRUCTOR_CHANGES" :
                
                if(state.createing_quiz) {
                    axios.post(`https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/quizes.json`, state.editing_quiz[1])
                    
                    message.success({
                        content: `${state.editing_quiz[1].name} was created`,
                        duration: 2.8,
                        className: 'search-empty-error'
                    })

                    const quizes_copy = [...state.user_quizes]
                    quizes_copy.push(state.editing_quiz)

                    return {...state, quiz_list: quizes_copy, redirect_from_constructor: true}
                }
                axios.put(`https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/quizes/${action.payload}.json`, state.editing_quiz[1])

                message.success({
                    content: `${state.editing_quiz[1].name} was saved`,
                    duration: 2.8,
                    className: 'search-empty-error'
                })
                
                return {...state, redirect_from_constructor: true}

        case "LOG_CONSTRUCTOR_ERROR":
            message.error({
                content: action.payload,
                duration: 2.8,
                className: 'search-empty-error'
            })

            return {...state}
            
        case "CHANGE_TRUE_ANSWER":
            const quiz = [...state.editing_quiz]
            quiz[1].tasks[action.payload.task_id].true_id = parseInt(action.payload.value) - 1

            if(_.isEqual(quiz, JSON.parse(localStorage.getItem("quiz-before-editing")))) {
                return {...state, editing_quiz: quiz, save_constructor_changes: false}
            } else return {...state, editing_quiz: quiz, save_constructor_changes: true}

        case "REMOVE_ITEM_FROM_CONSTRUCTOR":
            const editingQuiz = [...state.editing_quiz]

            if(action.payload.answer_id === null) {
                editingQuiz[1].tasks.splice(action.payload.task_id, 1)
            } else {
                editingQuiz[1].tasks[action.payload.task_id].answers.splice(action.payload.answer_id, 1)

                for(let i = 0; i < editingQuiz[1].tasks[action.payload.task_id].answers.length; i++) {
                    editingQuiz[1].tasks[action.payload.task_id].answers[i].answer_id = i
                }
            }
             

           

            if(_.isEqual(editingQuiz, JSON.parse(localStorage.getItem("quiz-before-editing")))) {
                return {...state, editing_quiz: editingQuiz, save_constructor_changes: false}
            } else return {...state, editing_quiz: editingQuiz, save_constructor_changes: true}

        case "ADD_TASK":
            let EditingQuiz = [...state.editing_quiz]

            EditingQuiz[1].tasks.push({
                true_id: 0,
                task_text: "",
                answers: [{
                    answer: "",
                    answer_id: 0
                },{
                    answer: "",
                    answer_id: 1
                }]
            })

            if(_.isEqual(EditingQuiz, JSON.parse(localStorage.getItem("quiz-before-editing")))) {
                return {...state, editing_quiz: EditingQuiz, save_constructor_changes: false}
            } else return {...state, editing_quiz: EditingQuiz, save_constructor_changes: true}

        case "CREATED_QUIZ": 
            const date = new Date()
            let day_with_zero = date.getDate()
            let month_with_zero = date.getMonth() + 1
            
            if(date.getDate() <= 9) {
                day_with_zero = String(day_with_zero).padStart(2, "0")
            }
            if((date.getMonth() + 1) <= 9) {
                month_with_zero = String(month_with_zero).padStart(2, "0")
            } 

            const newQuiz = [
                "",
                {
                active_task: 0,
                choose_alert_state: false,
                create_date: `${day_with_zero}.${month_with_zero}.${date.getFullYear()}`,
                creator_name: action.payload,
                disable_buttons: false,
                end_time: 0,
                name: "",
                show_choose_alert: false,
                start_time: 0,
                tasks : [ {
                    answers : [ {
                      answer : "",
                      answer_id : 0
                    }, {
                      answer : "",
                      answer_id : 1
                    } ],
                    task_text : "",
                    true_id : 1
                }],
                true_answers: 0  
            }]

            return {
                ...state,
                save_constructor_changes: true,
                should_render_constructor: true,
                createing_quiz: true,
                editing_quiz: newQuiz,
                redirect_from_constructor: false
            }

        case "REMOVE_QUIZ": 
        const user_quizes_copy = [...state.user_quizes]
        const new_user_quizes = user_quizes_copy.filter(quiz => quiz[0] !== action.payload.code)

        message.success({
            content: `${action.payload.name} was removed`,
            duration: 2.8,
            className: 'search-empty-error'
        })

        return {...state, user_quizes: new_user_quizes}            

        default : return state
    }
}

