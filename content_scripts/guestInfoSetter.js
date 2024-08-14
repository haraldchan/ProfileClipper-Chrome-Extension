
function setGuestInfo(info, modalType) {
	const inputEvent = new Event('input', { bubbles: true });
	const guestType = info.guestType
	
	patternToApply =
		guestType === '内地旅客' ? fieldLabelPatterns.mainland : guestType === '港澳台旅客' ? fieldLabelPatterns.hkMoTw : fieldLabelPatterns.foreign

	if (modalType === '修改旅客') {
		for (const [key, val] of Object.entries(patternToApply)) {
			let element = document.querySelector(`label[for="${val}"]`).nextElementSibling.getElementsByTagName('input')[0]
			element.value = info[key]	
			element.dispatchEvent(inputEvent)
		}

		if (guestType === '港澳台旅客' || guestType === '国外旅客') {
			let lastNameElement = Array.from(document.querySelectorAll('.el-form-item__label'))
									.filter((label) => label.innerText === '英文姓')[0]
									.nextElementSibling.querySelector('input')
			lastNameElement.value = info.nameLast
			lastNameElement.dispatchEvent(inputEvent)

			let firstNameElement = Array.from(document.querySelectorAll('.el-form-item__label'))
									.filter((label) => label.innerText === '英文名')[0]
									.nextElementSibling.querySelector('input')
			firstNameElement.value = info.nameFirst
			firstNameElement.dispatchEvent(inputEvent)

			if (guestType === '国外旅客') {
				let fullNameElement = Array.from(document.querySelectorAll('.el-form-item__label'))
									.filter((label) => label.innerText === '中文名')[0]
									.nextElementSibling.querySelector('input')
				fullNameElement.value = info.nameLast + ' ' + info.nameFirst
				fullNameElement.dispatchEvent(inputEvent)
			}
		}
	}

	if (modalType === '查看旅客') {
		return
		// for (const [key, val] of Object.entries(patternToApply)) {
		// 	let element = document.querySelector(`label[for="${val}"]`).nextElementSibling.getElementsByTagName('span')[0]
		// 	element.innerText = info[key]
		// }

		// if (guestType === '港澳台旅客' || guestType === '国外旅客') {
		// 	let lastNameElement = Array.from(document.querySelectorAll('.el-form-item__label'))
		// 							.filter((label) => label.innerText === '英文姓')[0]
		// 							.nextElementSibling.querySelector('span')
		// 	lastNameElement.innerText = info.nameLast


		// 	let firstNameElement = Array.from(document.querySelectorAll('.el-form-item__label'))
		// 							.filter((label) => label.innerText === '英文名')[0]
		// 							.nextElementSibling.querySelector('span')
		// 	firstNameElement.innerText = info.nameFirst

		// 	if (guestType === '国外旅客') {
		// 		let fullNameElement = Array.from(document.querySelectorAll('.el-form-item__label'))
		// 							.filter((label) => label.innerText === '中文名')[0]
		// 							.nextElementSibling.querySelector('span')
		// 		fullNameElement.innerText = info.nameLast + ' ' + info.nameFirst
		// 	}
		// }
	}
}