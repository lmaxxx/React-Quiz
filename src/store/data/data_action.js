import axios from 'axios'

export function GetData() {
    return (dispatch) => (
        axios.get("https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/quizes.json").then(response => dispatch(getData(response.data)))
    )
}

export function getData(data) {
    return {type: "GET_QUIZES_FROM_DB", payload: data}
}

export function SearchQuiz(e) {
    return {type: "SEARCH_QUIZ_FROM_LIST_BY_NAME", paylaod: e}
}

export function ReadQuizSearchInput(e) {
    return {type: "READ_QUIZ_INPUT_MAIN_PAGE", payload: e.target.value}
}

export function DeleteQuizFormResult() {
    return {type: "DELETE_QUIZ_FORM_RESULT"}
}

export function CheckData(nickname, data) {
    return async dispatch => {
        if(data.length === 0) {
            await dispatch(GetData())
            dispatch(SetUserQuizes(nickname))
        } else {
            dispatch(SetUserQuizes(nickname))
        }
    }
}

export function SetUserQuizes(nickname) {
    return {type: "SET_USER_QUIZES", payload: nickname}
}

export function SetQuizForEditing(quiz) {
    return {type: "SET_QUIZ_FOR_EDITING", payload: quiz}
}

export function SetInpurValueInConstructor(task_id, answer_id, e, changeTask, changeName) {
    return {type: "SET_INPUT_VALUE_IN_CONSTRUCTOR", payload: {task_id, answer_id, text: e.target.value, changeTask, changeName}}
} 

export function CheckConstructorForSaving(editing_quiz) {
    return dispatch => {
        try {
            if(editing_quiz[1].name === "") throw "Invalid name"
            if(editing_quiz[1].tasks.length === 0) throw "Quiz should contain at least 1 task"

            for(const task of editing_quiz[1].tasks) {
                if(task.task_text === "") {
                    throw "Fill all inputs"
                }

                task.answers.forEach(answer => {
                    if(answer.answer === "") {
                        throw "Fill all inputs"
                    } 
                })

                if(task.answers.length <= 1) throw "Task should contain at least 2 answers"
            }

            dispatch(SaveConstructorChanges(editing_quiz[0]))
        } catch(err) {
            dispatch(LogConstructorError(err))
        }
        
    }
}

export function SaveConstructorChanges(quiz_code) {
    return {type: "SAVE_CONSTRUCTOR_CHANGES", payload: quiz_code}
}

export function LogConstructorError(err) {
    return {type: "LOG_CONSTRUCTOR_ERROR", payload: err}
}

export function AddAnswer(task_id) {
    return {type: "ADD_ANSWER", payload: task_id}
}

export function ChangeTrueAnswer(task_id, e) {
    return {type: "CHANGE_TRUE_ANSWER", payload: {task_id, value: e.target.value}}
}

export function RemoveItemFromConstructor(task_id, answer_id) {
    return {type: "REMOVE_ITEM_FROM_CONSTRUCTOR", payload: {task_id, answer_id}}
}

export function AddTask() {
    return {type: "ADD_TASK"}
}

export function CreateQuiz(nickname) {
    return {type: "CREATED_QUIZ", payload: nickname}
}

export function CheckRemoveQuiz(code) {
    return async dispatch => {
        const QuizListResponse = await axios.get("https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/quizes.json")
        const data = QuizListResponse.data
        
        for(const quizCode in data) {
            if(quizCode === code) {
                let name = data[quizCode].name

                delete data[quizCode]
                await axios.put("https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/quizes.json", data)
                
                dispatch(RemoveQuiz(name, quizCode))
            } 
        }

    }
}

export function RemoveQuiz(name, code) {
    return {type: 'REMOVE_QUIZ', payload: {name, code}}
}