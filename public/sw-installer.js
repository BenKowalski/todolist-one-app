if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register('service-worker.js', {
	scope: '/'
	}).then(reg => {
		console.log(reg.scope, 'register')
		console.log('Service worker change, registered the service worker')
	})
}