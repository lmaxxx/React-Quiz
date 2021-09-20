import { message } from "antd"

const initialState = {
    is_registered: false,
    signup_active: false,
    nickname: '',
    login_form: {
        email: '',
        password: ''
    },
    signup_form: {
        nickname: '',
        email: '',
        password: ''
    }
}

export default function auth(state = initialState, action) {
    switch(action.type) {
        

        case "TOGGLE_FORM_TYPE": return {...state, signup_active: !state.signup_active}

        case "CLEAR_FORM_INPUTS": 
            return {
                ...state,
                login_form: {
                    email: '',
                    password: ''
                },
                signup_form: {
                    nickname: '',
                    email: '',
                    password: ''
                }
            }

        case "SET_FORM_INPUT": 
            if(action.payload.type.includes("login")) {
                return action.payload.type.includes("email") ? 
                {...state, login_form: {...state.login_form, email: action.payload.value}}
                : 
                {...state, login_form: {...state.login_form, password: action.payload.value}}
            } else {
                if (action.payload.type.includes("email")) return {...state, signup_form: {...state.signup_form, email: action.payload.value}}
                if (action.payload.type.includes("password")) return {...state, signup_form: {...state.signup_form, password: action.payload.value}}
                if (action.payload.type.includes("nickname")) return {...state, signup_form: {...state.signup_form, nickname: action.payload.value}}
            }

        case "LOGOUT" : 
            message.warning({
                content: "You were logged out", 
                duration: 2.8,
                className: 'search-empty-error'
            })
            return {...state, is_registered: false, nickname: ''}

        case "LOGIN_SUCCESS": 
            message.success({
                content: "You were logged in", 
                duration: 2.8,
                className: 'search-empty-error'
            })
            return {...state, is_registered: true}

        case "LOGIN_ERROR_EMAIL_NOT_FOUND": 
            message.error({
                content: "Email not found", 
                duration: 2.8,
                className: 'search-empty-error'
            })
            return state

        case "LOGIN_ERROR_INVALID_PASSWORD": 
            message.error({
                content: "Invalid password", 
                duration: 2.8,
                className: 'search-empty-error'
            })
            return state

        case "LOGIN_ERROR_USER_DISABLED":   
            message.error({
                content: "User was disabled by admin",
                duration: 2.8, 
                className: 'search-empty-error'
            })
            return state

        case "SIGNUP_SECCESS": 
        message.success({
            content: "You were registered", 
            duration: 2.8,
            className: 'search-empty-error'
        })
        return {...state, signup_active: false}

        case "SIGNUP_ERROR_INVALID_EMAIL": 
        message.error({
            content: "Invalid email", 
            duration: 2.8,
            className: 'search-empty-error'
        })
        return state

        case "SIGNUP_ERROR_EMAIL_EXISTS": 
        message.error({
            content: "The email address is already in use by another account", 
            duration: 2.8,
            className: 'search-empty-error'
        })
        return state

        case "SIGNUP_ERROR_WEAK_PASSWORD": 
        message.error({
            content: "Password should be at least 6 characters", 
            duration: 2.8,
            className: 'search-empty-error'
        })
        return state

        case "SIGNUP_ERROR_INVALID_NICKNAME":
        message.error({
            content: "Nickname should be at least 3 characters. Nickname can contain A-z, 0-9, _ -", 
            duration: 2.8,
            className: 'search-empty-error'
        })
        return state        

        case "SIGNUP_ERROR_NICKNAME_EXISTS":
        message.error({
            content: "This nickname is already in use by another account", 
            duration: 2.8,
            className: 'search-empty-error'
        })
        return state     

        case "SET_NICKNAME": 
            return {...state, nickname: action.payload}

        case "SET_USER_FROM_LOCAL_STORAGE": 
            return {
                ...state,
                nickname: action.payload.nickname,
                is_registered: true
            }


        default: return state
    }
}