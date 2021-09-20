import classes from './UserQuiz.module.css' 
import {Popconfirm} from 'antd';
import {NavLink} from 'react-router-dom'

const UserQuiz = (props) => {
    return ( 
        <div className={classes.UserQuiz} key={props.quiz[0]}>
            <p>{props.quiz[1].name}</p>
            <div className={classes.UserQuizIconsWrapper}>
                <NavLink 
                    className={classes.Icon} 
                    to={`${process.env.PUBLIC_URL}/constructor`}
                    onClick={props.SetQuizForEditing.bind(this, props.quiz)}
                ><i className="fas fa-pen"></i></NavLink>
                <Popconfirm
                    title="Are you sure to delete this quiz?"
                    onConfirm={props.CheckRemoveQuiz}
                    okText="Yes"
                    cancelText="No"
                    placement="bottom"
                >
                <div className={classes.Icon}><i className="fas fa-trash-alt"></i></div>
                </Popconfirm>
            </div>    
                
        </div>
    );
}
 
export default UserQuiz;