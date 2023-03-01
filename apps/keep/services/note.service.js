'use strict'

import { utilService } from '../../../services/util.service.js'
import noteData from "./../data/note.json" assert { type: "json" };
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.title))
            }
            console.log(notes);
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}


function getEmptyNote({ createdAt, type, isPinned, style, info }) {
    return {
        id: '',
        createdAt: createdAt || Date.now(),
        type: type || 'NoteTxt',
        isPinned: isPinned || false,
        style: style || utilService.getRandomColor(),
        info: info || { txt: utilService.makeLorem(20) }
    }
}


function _createNotes(amount) {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = noteData
        console.log(notes);
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function getDemoData() {

}
const demoData = []


