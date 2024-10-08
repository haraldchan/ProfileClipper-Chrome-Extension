// store local storage
let ls
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.ls) {
		ls = message.ls
	} else if (message.requestData) {
		sendResponse({ ls: ls })
	}
})

// setting behavior
// Define an array of supported URLs
const hotelUrl = 'https://api-yst.gdzwfw.gov.cn/yst_gdslgy/hotel/'

// Keep track of the current tab's URL and whether it is supported
let currentTabUrl = ''
let isCurrentTabSupported = true

function updateIcon() {
	if (!isCurrentTabSupported) {
		// URL is not supported, disable the extension icon and prevent showing the popup
		chrome.browserAction.setIcon({ path: { 48: 'icons/CFicon-48-inactive.png' } })
		chrome.browserAction.setPopup({ popup: '' })
		chrome.browserAction.disable()
	} else {
		// URL is supported, enable the extension icon and show the popup
		chrome.browserAction.setIcon({ path: { 48: 'icons/CFicon-48.png' } })
		chrome.browserAction.setPopup({ popup: 'popup/ProfileClipper.html' })
		chrome.browserAction.enable()
	}
}

chrome.runtime.onMessage.addListener((message) => {
	if (message.type === 'checkUrl') {
		currentTabUrl = message.url
		isCurrentTabSupported = currentTabUrl.includes(hotelUrl)
		updateIcon()
	}
})

// Listen for tab switch events
chrome.tabs.onActivated.addListener((activeInfo) => {
	// Get the URL of the newly activated tab
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (tab && tab.url) {
			currentTabUrl = tab.url
			isCurrentTabSupported = currentTabUrl.includes(hotelUrl)
			updateIcon()
		}
	})
})