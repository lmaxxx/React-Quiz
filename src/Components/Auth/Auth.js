import classes from './Auth.module.css'
import Navigation from '../Navigation/Navigation'
import {connect} from 'react-redux'
import {ToggleFormType, LoginCheckUp, setFormInput, SignUpCheckUp} from '../../store/auth/auth_action'
import {Redirect} from 'react-router-dom'
import FilledInput from '@mui/material/FilledInput';

const Auth = props => {
    if(props.is_registered) {
        return <Redirect to={`${process.env.PUBLIC_URL}/`} />
    }

    const LoginFormInputData = {
        email: props.login_email,
        password: props.login_password
    }

    const SignupFormInputData = {
        email: props.signup_email,
        password: props.signup_password,
        nickname: props.signup_nickname
    }

    return(
        <div className={classes.Auth}>
            <Navigation />
            {
                props.signup_active ? 
                <form onSubmit={(e) => props.SignUpCheckUP(e, SignupFormInputData)} className={classes.AuthForm}>
                    <h1>Sign up</h1>
                    <p className={classes.InputWrapper}>
                        <FilledInput 
                            value={props.signup_nickname} 
                            onChange={(e) => props.setFormINPUT('signup-nickname', e)}                         
                            placeholder='Nickname'
                            type="text" 
                            required
                            sx={{color: '#618930'}}
                            color="success"
                        />
                    </p>
                    <p className={classes.InputWrapper}>
                        <FilledInput 
                            value={props.signup_email} 
                            onChange={(e) => props.setFormINPUT('signup-email', e)} 
                            placeholder='Email' 
                            type="text" 
                            required
                            sx={{color: '#618930'}}
                            color="success"
                        />
                    </p>
                    <p className={classes.InputWrapper}>
                        <FilledInput 
                            value={props.signup_password} 
                            onChange={(e) => props.setFormINPUT('signup-password', e)}                         
                            placeholder='Password' 
                            type="password" 
                            required
                            sx={{color: '#618930'}}
                            color="success"
                        />
                    </p>
                    <button className={classes.Submit} type="submit">Submit</button>
                    <a className={classes.ToggleFormType} onClick={props.ToggleFormTYPE}>I already have an account</a>
                </form>
                :

                <form onSubmit={(e) => props.LoginCheckUP(e, LoginFormInputData)} className={classes.AuthForm}>
                    <h1>Log in</h1>
                    <p className={classes.InputWrapper}>
                        <FilledInput 
                            value={props.login_email} 
                            onChange={(e) => props.setFormINPUT('login-email' ,e)} 
                            type="text" 
                            required 
                            placeholder="Email"
                            sx={{color: '#618930'}}
                            color="success"
                        />
                    </p>
                    <p className={classes.InputWrapper}>
                        <FilledInput 
                            value={props.login_password} 
                            onChange={(e) => props.setFormINPUT('login-password' ,e)} 
                            placeholder="Password"
                            type="password" 
                            required
                            sx={{color: '#618930'}}
                            color="success"
                        />
                    </p>
                    <button className={classes.Submit} type="submit">Submit</button>
                    <a className={classes.ToggleFormType}  onClick={props.ToggleFormTYPE}>I don't have an account</a>
                </form>
            }

        </div>
    )
}
function mapStateToProps(state) {
    return {
        signup_email: state.auth.signup_form.email,
        signup_password: state.auth.signup_form.password,
        signup_nickname: state.auth.signup_form.nickname,
        login_email: state.auth.login_form.email,
        login_password: state.auth.login_form.password,
        signup_active: state.auth.signup_active,
        is_registered: state.auth.is_registered,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ToggleFormTYPE: () => dispatch(ToggleFormType()),
        LoginCheckUP: (e, formInputData) => dispatch(LoginCheckUp(e, formInputData)),
        SignUpCheckUP: (e, formInputData) => dispatch(SignUpCheckUp(e, formInputData)),
        setFormINPUT: (type, e) => dispatch(setFormInput(type, e))
    }   
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Auth)