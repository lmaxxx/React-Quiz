import './SearchForm.css'
import {connect} from 'react-redux'
import {SearchQuiz, ReadQuizSearchInput, DeleteQuizFormResult} from '../../store/data/data_action'

const SearchForm = props => {
    return (
        <>
        <div className="search">
            <form action="" onSubmit={props.Search}>
                <input type="checkbox" id="trigger" className="search__checkbox" />
                <label className="search__label-init" htmlFor="trigger"></label>
                <label className="search__label-active" htmlFor="trigger"></label>
                <div className="search__border"></div>
                    <input value={props.search_input_text} type="text" onChange={props.ReadInpit} className="search__input" />
                <div className="search__close"></div>
            </form>
        </div>
        
        {props.text && <div onClick={props.onDelete} className="QuizResultTextWrapper"><p className="QuizResultText">"{props.text}"</p><i className="far fa-times-circle"></i></div>}
        </>
    )
}

function mapStateToProps(state) {
    return {
        text: state.data.search_result_text,
        search_input_text: state.data.search_input_text
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Search: e => dispatch(SearchQuiz(e)),
        ReadInpit: e => dispatch(ReadQuizSearchInput(e)),
        onDelete: () => dispatch(DeleteQuizFormResult())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (SearchForm)