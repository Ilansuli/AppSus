
export const mapService = {
    initMap,
    getCurrPos,

    connectGoogleApi
}
const gMap = null

let gCurrPos = { lat: 32.0749831, lng: 34.9120554 }
const API_KEY = 'AIzaSyA5r6sPaBXcDNC1HFosp_z4t-zsEz0pOfE'

function getCurrPos() {
    return gCurrPos
}

function initMap() {
    return connectGoogleApi()
}


function connectGoogleApi() {
    if (window.google) return Promise.resolve()
    let elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=Function.proptotype`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
