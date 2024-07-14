const identifier = '04047fce826f48f751891b4721f7ac70' // MD5 hash: ProfileModifyNext
const body = document.querySelector('body')

let currentGuest = {}

function cleanLocalStorage() {
	const currentTime = new Date().getTime()
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i)
		const timestamp = parseInt(key, 10)
		if (!isNaN(timestamp)) {
			if (currentTime - timestamp >= 24 * 60 * 60 * 1000) {
				localStorage.removeItem(key)
			}
		}
	}
}

function sendToClipboard(guestInfoObj) {	
	const textArea = document.createElement('textarea')
	textArea.value = JSON.stringify(guestInfoObj)
			
	document.body.appendChild(textArea)
	textArea.select()
	document.execCommand('Copy')
	textArea.remove()	
}

function addSaveGuestInfo(guestTypes, button, shortcutKey) {
	if (!button.hasAttribute('capture-event-added')) {
		button.addEventListener('click', () => {
			const currentGuestType = guestTypes.filter((radio) => radio.classList.contains('is-checked'))[0].textContent
			
			const guestInfo = getGuestInfo(currentGuestType)

			
			for (const [key, val] of Object.entries(guestInfo)) {
				if (key === 'tel') {
					guestInfo.tel = val === '' ? ' ' : val
					continue
				}
				if (key === 'roomNum') {
					guestInfo.roomNum = val === '' ? ' ' : val
					continue
				}
				if (val === '') {
					return
				}
			}

			navigator.clipboard.writeText(JSON.stringify(guestInfo))
			if (!guestInfo.name.includes('*')) {
				localStorage.setItem(new Date().getTime(), JSON.stringify(guestInfo))
				cleanLocalStorage()
			}
		})

		// binding shortcut keys
		document.addEventListener('keyup', (e) => {
			if (e.ctrlKey && e.key === shortcutKey) {
				button.click()
			}
		})

		button.setAttribute('capture-event-added', 'true')
	} 
}

function addRadioListener(groupRadio, guestTypes) {
	if (!groupRadio.hasAttribute('capture-event-added')) {
		groupRadio.addEventListener('click', () => {
			setTimeout(() => {
				const spans = Array.from(document.getElementsByTagName('span'))
				const saveBtn = spans.filter((span) => span.innerText === ('保存(S)'))[0].parentElement
				addSaveGuestInfo(guestTypes, saveBtn, 's')	
			}, 500);
		})
		groupRadio.setAttribute('capture-event-added', 'true')
	} 
}

const observer = new MutationObserver(async (mutationsList, observer) => {

	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			const spans = Array.from(document.getElementsByTagName('span'))
			const groupRadio = spans.filter((span) => span.innerText === '团体')[0].parentElement
			const submitBtn = spans.filter((span) => span.innerText === '上报(R)')[0].parentElement
			const guestTypes = Array.from(spans.filter((span) => span.innerText === '内地旅客')[0].parentElement.parentElement.querySelectorAll('.el-radio'))

			addSaveGuestInfo(guestTypes, submitBtn, 'r')

			try {
				const saveBtn = spans.filter((span) => span.innerText === '保存(S)')[0].parentElement
				addSaveGuestInfo(guestTypes, saveBtn, 's')	
			} catch {
				addRadioListener(groupRadio, guestTypes)
			}
		}
	}
})

observer.observe(body, { childList: true })

const url = window.location.href
chrome.runtime.sendMessage({ type: 'checkUrl', url: url })