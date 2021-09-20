const initialState = {
    
}

export default function active_quiz(state = initialState, action) {
    switch(action.type) {
        case "TRUE_ANSWER":
            localStorage.setItem("active-quiz", JSON.stringify({
                ...state,
                active_task: state.active_task + 1,
                true_answers: state.true_answers + 1,
                disable_buttons: false}))
            return {
                ...state,
                active_task: state.active_task + 1,
                true_answers: state.true_answers + 1,
                disable_buttons: false,
            }
        case "FALSE_ANSWER":
            localStorage.setItem("active-quiz", JSON.stringify({
                ...state,
                active_task: state.active_task + 1,
                disable_buttons: false,
            }))
            return {
                ...state,
                active_task: state.active_task + 1,
                disable_buttons: false,
            }
        case "SHOW_CHOOSE_ANIMATION": 
            return action.payload ? 
            {...state,
                show_choose_alert: !state.show_choose_alert,
                choose_alert_state: true,
                disable_buttons: true
                } 
            :
            {...state,
                show_choose_alert: !state.show_choose_alert,
                choose_alert_state: false,
                disable_buttons: true
            }
        case "START_TIMER": 
            const startTime = new Date().getTime()
            return {...state, start_time: startTime}
        case "END_TIMER" : 
            const endTime = new Date().getTime() 
            return {...state, end_time: endTime}
        case "SET_ACTIVE_QUIZ" : 
            if(JSON.parse(localStorage.getItem("active-quiz"))?.name !== action.paylaod.name)
                localStorage.setItem("active-quiz", JSON.stringify(action.paylaod))
            return action.paylaod
        case "GET_QUIZ_FROM_STORAGE" : 
            const quiz = JSON.parse(localStorage.getItem("active-quiz"))
            return quiz


        default: return state
    }
}