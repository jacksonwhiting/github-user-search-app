export { applyProperTheme, toggleDarkLight, fetchData, dayMonthYearFormat }

// Checks if Dark Theme applied in local storage or on the window object.  If so adds
//   the dark class and changes the text  on the header to "light".
const applyProperTheme = () => {
	const darkText = document.querySelector("#dark-text")
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark")
		darkText.textContent = "light"
	} else {
		document.documentElement.classList.remove("dark")
		darkText.textContent = "dark"
	}
}

// Toggles between dark and light theme when user clicks the div
let toggleDarkLight = () => {
	const darkIcon = document.querySelector("#dark-icon")

	darkIcon.addEventListener("click", (e) => {
		e.preventDefault()
		if (localStorage.theme === "light") {
			localStorage.theme = "dark"
		} else {
			localStorage.theme = "light"
		}
		applyProperTheme()
	})
}

const fetchData = async (url) => {
	const response = await fetch(url)
	console.log(response)
	if (response.ok) {
		const data = response.json()
		return data
	} else {
		throw new Error("An error occured while fetching data")
	}
}

//Short months format
const months = {
	0: "Jan",
	1: "Feb",
	2: "Mar",
	3: "Apr",
	4: "May",
	5: "June",
	6: "July",
	7: "Aug",
	8: "Sept",
	9: "Oct",
	10: "Nov",
	11: "Dec",
}

//Takes in a date string and converts it to the following format: 15 Jan 2023
let dayMonthYearFormat = (dateString) => {
	const dateCreated = new Date(dateString)
	const createdDay = dateCreated.getDate()
	const createdMonth = months[dateCreated.getMonth()]
	const createdYear = dateCreated.getFullYear()
	return `${createdDay} ${createdMonth} ${createdYear}`
}
