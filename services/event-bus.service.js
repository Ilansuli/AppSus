'use strict'

//SEND FUNCTION
function on(eventName, listener) {
    console.log(eventName, listener);
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    // Returning the unsubscribe function:
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}
//GET FUNCTION 
function emit(eventName, data) {
    console.log(eventName, data);
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const eventBusService = { on, emit }

// const map = {
//     'user-msg': [func1, func2],
//     'test-event': [func3],
// }


export function showUserMsg(msg) {
    eventBus.emit('show-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}