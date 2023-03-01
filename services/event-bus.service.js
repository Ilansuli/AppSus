'use strict'

// function createEventEmitter(defaultHandler = null){
//     const listenersMap = {}

//     return {
//         on(evName, listener){
//             listenersMap[evName] = listenersMap[evName] ? [ ...listenersMap[evName], listener ] : [ listener ]
//             return () => listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
//         },
//         emit(evName, payload){
//             if(listenersMap[evName]) listenersMap[evName].forEach(listener => listener(payload))
//             else if(defaultHandler) defaultHandler()
//         }
//     }
// }
// export const eventBus = createEventEmitter(() => console.log('No handler associated with this event...'))

//SEND FUNCTION
function on(eventName, listener) {
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
    showUserMsg({txt, type: 'success'})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error'})
}