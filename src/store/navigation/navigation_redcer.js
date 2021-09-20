import disableScroll from 'disable-scroll';

const initialState = {
    show: false
}

export default function navigation(state = initialState, action) {
    switch(action.type) {
        case "TOGGLE_NAVIGATION" : 
            if(action.paylaod) {
                disableScroll.off()
                return {...state, show: false}
            }  

            state.show ? disableScroll.off() : disableScroll.on()

            return {...state, show: !state.show}





        default: return state
    }
}