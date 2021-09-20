export function CheckSelection(answerId, trueId) {
    return (dispatch) => {
        if(answerId === trueId) {
            dispatch(ShowAnimation(true))
            setTimeout(() => dispatch(TrueAnswer()), 600)
            
        } else {
            dispatch(ShowAnimation(false))
            setTimeout(() => dispatch(FalseAnswer()), 600)
        }
    }
}

export function TrueAnswer() {
    return {type: "TRUE_ANSWER"}
}

export function FalseAnswer() {
    return {type: "FALSE_ANSWER"}
}

export function ShowAnimation(state) {
    return {type: "SHOW_CHOOSE_ANIMATION", payload: state}
}

export function StartTimer() {
    return {type: "START_TIMER"}
}

export function EndTimer() {
    return {type: "END_TIMER"}
}

export function SetActiveQuiz(quiz) {
    return {type: "SET_ACTIVE_QUIZ", paylaod: quiz}
}

export function GetQuizFromStorage() {
    return {type: "GET_QUIZ_FROM_STORAGE"}
}
