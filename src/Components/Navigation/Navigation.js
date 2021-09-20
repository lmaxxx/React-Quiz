import classes from './Navigation.module.css'
import {connect} from 'react-redux'
import {ToggleNavigation} from '../../store/navigation/navigation_action'
import NavigationBackground from '../NavigationBackground/NavigationBackground'
import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {Logout} from '../../store/auth/auth_action'
import { useMediaQuery } from 'react-responsive'

const Navigation = props => {
    const isTabletScreen = useMediaQuery({ query: '(max-width: 900px)' })
    const isPhoneScreen = useMediaQuery({ query: '(max-width: 515px)' })
    let style = {}
    useEffect(() => props.onToggle(true), [])

    
    if(!props.show) {
        if(isTabletScreen) style = {left: "-50%"}
        if(isPhoneScreen) style = {left: "-100%"}
        if(!isTabletScreen && !isPhoneScreen) style={left: "-30%"}
    } 

    return (
        <>
        <div className={classes.Burger}>
            <div onClick={props.onToggle.bind(this, false)} style={{position: "relative", width: "100%", height: "100%",display: "grid", placeItems: "center"}}>
                <div className={classes.Line}></div>
            </div>
        </div>
        <div style={style} className={classes.Navigation}>
            {
                props.is_registered ? 
                <>
                    <img className={classes.UserImg} src="https://image.flaticon.com/icons/png/512/149/149071.png" alt="" />
                    <a style={{cursor: "initial"}} className={classes.NavButton}>{props.nickname}</a>
                    <NavLink className={classes.NavButton} to={`${process.env.PUBLIC_URL}/`}>Home</NavLink>
                    <NavLink className={classes.NavButton} to={`${process.env.PUBLIC_URL}/my-quizes`}>My quizes</NavLink>
                    <p onClick={props.logout} style={{cursor: 'pointer'}} className={classes.NavButton} >Log out</p>
                </>
                : 
                <>
                <NavLink className={classes.NavButton} to={`${process.env.PUBLIC_URL}/`}>Home</NavLink>
                <NavLink className={classes.NavButton} to={`${process.env.PUBLIC_URL}/auth`}>Log in</NavLink>
                </>
            }
            
        </div>
        <NavigationBackground />
        </>
    )
}

function mapStateToProps(state) {
    return {
        show: state.navigation.show,
        is_registered: state.auth.is_registered,
        nickname: state.auth.nickname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: (shouldHide) => dispatch(ToggleNavigation(shouldHide)),
        logout: () => dispatch(Logout()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Navigation)