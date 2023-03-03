'use strict'

import { utilService } from '../../../services/util.service.js'
import emailData from "./../data/email.json" assert { type: "json" };
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail
}

_createEmails()

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.title))
            }
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = emailData
        console.log(emails);
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}


function getEmptyEmail() {
    return{
        id: '',
        subject:'',
        body:'',
        isRead: false,
        sentAt: 0,
        removedAt:null,
        from:'',
        to:'',
    }
}
const demoData = [


]

