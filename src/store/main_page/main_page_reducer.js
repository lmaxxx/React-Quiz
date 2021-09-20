import disableScroll from 'disable-scroll';

const initialState = {
    show_alert: false,
    alert_options: {}
}

export default function main_page(state = initialState, action) {
    switch(action.type) {
        case "TOGGLE_PRESTART_ALERT" : 
            if(typeof action.payload === 'object') {
                state.show_alert ? disableScroll.off() : disableScroll.on()
                return {...state, show_alert: !state.show_alert, alert_options: action.payload}
            } 
            else if(action.payload === '') {
                disableScroll.off()
                return {...state, show_alert: false}
            } 
            else {
                state.show_alert ? disableScroll.off() : disableScroll.on()
                return {...state, show_alert: !state.show_alert}
            } 


        default: return state
    }
}