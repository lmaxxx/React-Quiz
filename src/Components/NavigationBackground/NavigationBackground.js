import classes from './NavigationBackground.module.css'
import {connect} from 'react-redux'
import {ToggleNavigation} from '../../store/navigation/navigation_action'

const NavigationBackground = props => {
    const cls = [classes.NavigationBackground]

    if(props.show) cls.push(classes.ActiveNavigation)

    return <div onClick={props.onToggle} className={cls.join(" ")}></div>
}

function mapStateToProps(state) {
    return {
        show: state.navigation.show
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: () => dispatch(ToggleNavigation())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (NavigationBackground)