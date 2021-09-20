import classes from './QuizList.module.css'
import QuizListItem from '../QuizListItem/QuizListItem'
import {connect} from 'react-redux'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const QuizList = props => {
    return (
        <div className={classes.QuizList}>
            {
                props.quiz_list.length ? 
                props.quiz_list.map((item, index) => {
                    return <QuizListItem key={index} quiz={item[1]} name={item[1].name} creator={item[1].creator_name} date={item[1].create_date} />
                })
                : props.error && props.error !== undefined ? 
                <p className={classes.Error}>Nothing was found</p>:
                <div className={classes.LoaderWrapper}>
                    <Loader
                        type="TailSpin"
                        color="#ffffff"
                        height={150}
                        width={150}
                    />
                </div>
            }
        </div>
    )
}
 
function mapStateToProps(state) {
    return {
        quiz_list: state.data.sorted_quiz_list,
        error: state.data.error
    }
}

export default connect(mapStateToProps) (QuizList)