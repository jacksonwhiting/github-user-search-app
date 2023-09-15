// On page load or when changing themes, best to add inline in `head` to avoid FOUC
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

// Listens to the window object for changes to the color-scheme setup by the user.
//   If a change occurs - sets the appropriate theme
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", function (e) {
		const colorScheme = e.matches ? "dark" : "light"
		localStorage.theme = colorScheme
		applyProperTheme()
	})

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

applyProperTheme()
toggleDarkLight()

const fetchAdvice = async () => {
	const response = await fetch("https://api.adviceslip.com/advice")
	if (response.ok) {
		const adviceObject = await response.json()
		return adviceObject
	} else {
		throw new Error("An error occured while fetching data")
	}
}

let renderAdvice = () => {
	fetchAdvice()
		.then((data) => {
			const adviceTitle = document.querySelector("#advice-title")
			const adviceStatement = document.querySelector("#advice-statement")

			adviceTitle.textContent = `Advice #${data.slip.id}`
			adviceStatement.textContent = `"${data.slip.advice}"`
		})
		.catch((err) => {
			console.log(err)
		})
}
