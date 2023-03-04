import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'

import EmailIndex from './apps/email/pages/EmailIndex.js'
import EmailDetails from './apps/email/pages/EmailDetails.js'
const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/note',
			component: NoteIndex,
			children: [
				{
					path: ':noteId',
					component: NoteDetails
				},
			]
		},
		{
			path: '/email',
			component: EmailIndex,
			props: true,
			children: [
				{
					path: ':emailId',
					component: EmailDetails,
				},
				{
					path: ':type',
					component: EmailIndex
				}
			]
		},
		// Last fallback if no route was matched:
		{
			path: '/:catchAll(.*)',
			component: HomePage
		}
	],
}

export const router = createRouter(routerOptions)
