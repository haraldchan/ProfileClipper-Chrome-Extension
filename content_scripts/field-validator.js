function formReader(field) {
	return document.querySelector(`label[for="${field}"]`)
	               .nextElementSibling
	               .getElementsByTagName('input')[0]
	               .value
}

function validateAndFixBirthday() {
	const date = new Date() 
	const bdInputs = Array.from(document.querySelectorAll(`label[for="csrq"]`)).map(el => el.nextElementSibling.getElementsByTagName('input')[0])
	for (const bdInput of bdInputs) {
		if (bdInput.value === '') continue

		console.log(date.getFullYear() - bdInput.value.split('-')[0])
		if (date.getFullYear() - bdInput.value.split('-')[0] >= 100) {
			const wrongDate = bdInput.value.split('-')
			wrongDate[0] = Number(wrongDate[0]) + 100
			bdInput.value = wrongDate.join('-')
		}		
	}
}

function validateForeignGuestNames(currentGuestType) {
	const country = formReader('country')
	const lastName = formReader('wwx')
	const firstName = formReader('wwm')

	if (currentGuestType === '国外旅客' && country !== '印度尼西亚' && lastName === firstName) {
		alert('\n姓与名重复，请检查是否正确。')
	}
}