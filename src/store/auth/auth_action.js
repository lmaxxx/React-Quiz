import axios from 'axios'
import {ToggleNavigation} from '../navigation/navigation_action'
import CryptoJS from 'crypto-js'

export function setFormInput(type ,e) {
    return {type: "SET_FORM_INPUT", payload: {type: type, value: e.target.value}}
}

function doToggleFormType() {
    return {type: "TOGGLE_FORM_TYPE"}
}

export function clearFormInputs() {
    return {type: "CLEAR_FORM_INPUTS"}
}

export function ToggleFormType() {
    return dispatch => {
        dispatch(doToggleFormType())
        dispatch(clearFormInputs())
    }
}

export function Logout() {
    return dispatch => {
        dispatch(clearFormInputs())
        dispatch(ToggleNavigation(true))
        dispatch(doLogout())
    }
}

export function doLogout() {
    localStorage.removeItem('userUrl')
    return {type: "LOGOUT"}
}

export function LoginCheckUp(e, formInputData) {
    e.preventDefault()
    const logInLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    const usersUrl = 'https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/users.json'
    const postInformation = {email: formInputData.email, password: formInputData.password, returnSecureToken: true}

    return async dispatch => {
        try {
            await axios.post(logInLink + process.env.REACT_APP_API_KEY, postInformation)

            const usersResponse = await axios.get(usersUrl)
            const userList = Object.entries(usersResponse.data)

            for(const user of userList) {
                if(user[1].email === formInputData.email) {
                    dispatch(setNickname(user[1].name))
                    setEncryptUserApiLink(user[0])
                    break
                }
            }

            dispatch(LoginSuccess())

        } catch(err) {
            switch(err?.response?.data.error.errors[0].message) {
                case 'EMAIL_NOT_FOUND': 
                    dispatch(LoginErrorEmailNotFound())
                    break

                case 'INVALID_EMAIL': 
                    dispatch(LoginErrorEmailNotFound())
                    break                

                case 'INVALID_PASSWORD': 
                    dispatch(LoginErrorInvalidPassword()) 
                    break

                case 'USER_DISABLED': 
                    dispatch(LoginErrorUserDisabled())
                    break
            }
        }   
    }
}

function setEncryptUserApiLink(code) {
    const userUrl = `https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/users/${code}.json`
    const encrypted = CryptoJS.AES.encrypt(userUrl, process.env.REACT_APP_CRYPTOJS_PASPHRASE);
    localStorage.setItem('userUrl', encrypted.toString())
}

export function LoginSuccess() {
    return {type: "LOGIN_SUCCESS"}
}

export function LoginErrorEmailNotFound() {
    return {type: "LOGIN_ERROR_EMAIL_NOT_FOUND"}
}

export function LoginErrorInvalidPassword() {
    return {type: "LOGIN_ERROR_INVALID_PASSWORD"}
}

export function LoginErrorUserDisabled() {
    return {type: "LOGIN_ERROR_USER_DISABLED"}
}

export function SignUpCheckUp(e, formInputData) {
    e.preventDefault()
    const signUpLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    const usersUrl = 'https://quiet-stacker-305512-default-rtdb.europe-west1.firebasedatabase.app/users.json'
    const postInformation = {email: formInputData.email, password: formInputData.password, returnSecureToken: true}
    const nicknameValidator = /^[a-z0-9_-]{3,20}$/igm
    let sameNamesCounter = 0

    return async dispatch => {
        if(nicknameValidator.test(formInputData.nickname)) {
            try {
                const usersResponse = await axios.get(usersUrl)
                const userList = Object.values(usersResponse.data)

                for(let i = 0; i < userList.length; i++) {
                    if(userList[i].name === formInputData.nickname) {
                        sameNamesCounter++
                    }
                }
                
                if(sameNamesCounter !== 0) {
                    dispatch(SignUpErrorNicknameExists())
                } else {
                    await axios.post(signUpLink + process.env.REACT_APP_API_KEY, postInformation)
                    dispatch(SignUpSuccess())
                    axios.post(usersUrl, {name: formInputData.nickname, email: formInputData.email})
                }
            } catch(err) {
                    switch(err?.response?.data.error.errors[0].message) {
                        case 'EMAIL_EXISTS': 
                            dispatch(SignUpErrorEmailExists())
                            break
        
                        case 'INVALID_EMAIL': 
                            dispatch(SignUpErrorInvalidEmail())
                            break                
        
                        case 'WEAK_PASSWORD : Password should be at least 6 characters': 
                            dispatch(SignUpErrorWeakPassword()) 
                            break
                    
                }
            }  
        } else dispatch(SignUpErrorInvalidNickname())
    }
}

export function SignUpSuccess() {
    return {type: 'SIGNUP_SECCESS'}
}

export function SignUpErrorInvalidEmail() {
    return {type: "SIGNUP_ERROR_INVALID_EMAIL"}
}

export function SignUpErrorEmailExists() {
    return {type: "SIGNUP_ERROR_EMAIL_EXISTS"}
}

export function SignUpErrorWeakPassword() {
    return {type: "SIGNUP_ERROR_WEAK_PASSWORD"}
}

export function SignUpErrorInvalidNickname() {
    return {type: "SIGNUP_ERROR_INVALID_NICKNAME"}
}

export function SignUpErrorNicknameExists() {
    return {type: "SIGNUP_ERROR_NICKNAME_EXISTS"}
}

export function setNickname(nickname) {
    return {type: 'SET_NICKNAME', payload: nickname}
}

export function checkUserUrlInLocalStorage() {
    return async dispatch => {
        if(localStorage.getItem('userUrl')) {
            const EncryptedUserUrl = localStorage.getItem('userUrl')
            const DecryptedUserUrlString = CryptoJS.AES.decrypt(EncryptedUserUrl, process.env.REACT_APP_CRYPTOJS_PASPHRASE).toString(CryptoJS.enc.Utf8)
    
            const userResponse = await axios.get(DecryptedUserUrlString)
        
            dispatch(setUserFromLocalStorage(userResponse.data.name))
        }
    }
}

export function setUserFromLocalStorage(nickname) {
    return {type: "SET_USER_FROM_LOCAL_STORAGE", payload: {nickname: nickname}}
}