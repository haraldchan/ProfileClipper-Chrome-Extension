const fieldLabelPatterns = {
	mainland: {
		name: 'xm',
		gender: 'xb',
		birthday: 'csrq',
		addr: 'czdz',
		idType: 'idType',
		idNum: 'idCode',
		roomNum: 'fjh',
		tel: 'lxdh',
	},
	hkMoTw: {
		name: 'xm',
		gender: 'xb',
		birthday: 'csrq',
		idType: 'cardType',
		idNum: 'cardId',
		region: 'region',
		roomNum: 'fjh',
		tel: 'lxdh',
	},
	foreign: {
		nameLast: 'wwx',
		nameFirst: 'wwm',
		gender: 'xb',
		birthday: 'csrq',
		country: 'country',
		idType: 'foreignCardType',
		idNum: 'cardId',
		roomNum: 'fjh',
		tel: 'lxdh',
	},
}

function getGuestInfo(guestType) {
	const guestInfo = { identifier, guestType }

	const tsIdStore = document.querySelector('.el-textarea__inner')
	const changeEvent = new Event('input', {
		bubbles: true,
		cancelable: true,
	})

	if (tsIdStore.value === '') {
		const tsId = Date.now()
		guestInfo.tsId = tsId
		tsIdStore.value = tsId
		tsIdStore.dispatchEvent(changeEvent)
	} else {
		guestInfo.tsId = tsIdStore.value
	}

	patternToApply =
		guestType === '内地旅客' ? fieldLabelPatterns.mainland : guestType === '港澳台旅客' ? fieldLabelPatterns.hkMoTw : fieldLabelPatterns.foreign

	for (const [key, val] of Object.entries(patternToApply)) {
		guestInfo[key] = document.querySelector(`label[for="${val}"]`).nextElementSibling.getElementsByTagName('input')[0].value
	}

	if (guestType === '港澳台旅客') {
		guestInfo.nameLast = Array.from(document.querySelectorAll('.el-form-item__label'))
			.filter((label) => label.innerText === '英文姓')[0]
			.nextElementSibling.querySelector('input').value
		guestInfo.nameFirst = Array.from(document.querySelectorAll('.el-form-item__label'))
			.filter((label) => label.innerText === '英文名')[0]
			.nextElementSibling.querySelector('input').value

		guestInfo.nameLast = guestInfo.nameLast === '' ? ' ' : guestInfo.nameLast
		guestInfo.nameFirst = guestInfo.nameFirst === '' ? ' ' : guestInfo.nameFirst
	}

	if (guestType === '国外旅客' || guestType === '港澳台旅客') {
		guestInfo.addr = ' '
	}

	if (guestType === '国外旅客') {
		guestInfo.name = guestInfo.nameLast + ', ' + guestInfo.nameFirst
	}

	const ecoTime = document.querySelector(`label[for="f006"]`).nextElementSibling.getElementsByTagName('input')[0].value
	const day = +ecoTime.split(' ')[0].split('-')[2] - 2

	const regTime = new Date(ecoTime)
	regTime.setDate(day)

	const rYear = regTime.getFullYear()
	const rMonth = regTime.getMonth() + 1 < 10 ? '0' + (regTime.getMonth() + 1) : regTime.getMonth() + 1
	const rDay = regTime.getDate() + 1 < 10 ? '0' + String(regTime.getDate() + 1) : regTime.getDate() + 1
	const rHour = regTime.getHours() < 10 ? '0' + String(regTime.getHours()) : regTime.getHours()
	const rMinutes = regTime.getMinutes() < 10 ? '0' + String(regTime.getMinutes()) : regTime.getMinutes()

	guestInfo.regTime = String(rYear) + String(rMonth) + String(rDay) + String(rHour) + String(rMinutes)

	const isMod = document.querySelector('.el-dialog__title').textContent
	if (isMod === '新增旅客') {
		guestInfo.isMod = false
	} else if (isMod === '修改旅客') {
		guestInfo.isMod = true
	}

	console.log(guestInfo)
	return guestInfo
}