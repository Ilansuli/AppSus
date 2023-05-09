'use strict'

export const utilService = {
    makeId,
    makeNoteId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    getRandomColor,
    setQueryStringParams,
}

function makeId(length = 11) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeNoteId(length = 3) {
    var txt = 'n'
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}


function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function setQueryStringParams(lat, lng) {
    const queryStringParams = `?lat=${lat}&lng=${lng}`

    const newUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

getTimeStamps()
function getTimeStamps() {
    const timestamps = [];

    for (let i = 0; i < 40; i++) {
        const year = 2018 + Math.floor(Math.random() * 5); // Random year between 2018 and 2022
        const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
        const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
        const hours = Math.floor(Math.random() * 24); // Random hours between 0 and 23
        const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
        const seconds = Math.floor(Math.random() * 60); // Random seconds between 0 and 59
        const milliseconds = Math.floor(Math.random() * 1000); // Random milliseconds between 0 and 999
        const timestamp = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds).getTime();
        timestamps.push(timestamp);
    }
}