import {
	applyProperTheme,
	toggleDarkLight,
	fetchData,
	dayMonthYearFormat,
} from "./functions.js"

// Listens to the window object for changes to the color-scheme setup by the user.
//   If a change occurs - sets the appropriate theme
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", function (e) {
		const colorScheme = e.matches ? "dark" : "light"
		localStorage.theme = colorScheme
		applyProperTheme()
	})

const renderUserInfo = () => {
	const inputUserName = document.querySelector("#search-text")
	const userSearchBtn = document.querySelector("#user-search-btn")
	const searchErrMsgDesktop = document.querySelector("#search-err-msg-desktop")
	const searchErrMsgMobile = document.querySelector("#search-err-msg-mobile")

	userSearchBtn.addEventListener("click", (e) => {
		//Remove error messages if they exist in both mobile and desktop views
		if (!searchErrMsgDesktop.classList.contains("md:hidden")) {
			searchErrMsgDesktop.classList.remove("md:block")
			searchErrMsgDesktop.classList.add("md:hidden")
		}
		if (!searchErrMsgMobile.classList.contains("hidden")) {
			searchErrMsgMobile.classList.add("hidden")
		}

		e.preventDefault()

		//Remove all whitespace and make lowercase
		const userName = inputUserName.value.toLowerCase().replaceAll(/\s/g, "")
		if (userName === "") {
			alert("Please enter a username")
			return
		}
		console.log(userName)
		fetchData(`https://api.github.com/users/${userName}`)
			.then((userInfo) => {
				displayUserInfo(userInfo)
				console.log(userInfo)
			})
			.catch((err) => {
				console.log(err)
				//show error messages
				searchErrMsgDesktop.classList.remove("md:hidden")
				searchErrMsgDesktop.classList.add("md:block")
				searchErrMsgMobile.classList.remove("hidden")
			})
	})
	inputUserName.value = ""
}

const displayUserInfo = (user) => {
	//Create an object of all user info where the ID attribute is the key and the value is the node element
	const userInfoEl = Array.from(document.querySelectorAll(".js-user-info"))
	const userInfo = Object.assign(
		...userInfoEl.map((item) => ({ [item.attributes.id.nodeValue]: item }))
	)

	//displays user avatar
	userInfo["user-avatar-desktop"].src = user.avatar_url
	userInfo["user-avatar-mobile"].src = user.avatar_url

	//displays user-name
	if (user.name) {
		userInfo["user-name"].textContent = user.name
	} else {
		userInfo["user-name"].textContent = user.login
	}

	//Displays login name
	userInfo["user-login-name"].textContent = `@${user.login}`

	//Displays date joined github
	const dateCreated = dayMonthYearFormat(user.created_at)
	userInfo["user-date-joined"].textContent = `Joined ${dateCreated}`

	//Displays the user's bio
	if (user.bio) {
		userInfo["user-bio"].textContent = user.bio
	} else {
		userInfo["user-bio"].textContent = "The profile has no bio"
	}

	//Displays the user's info regarding number of repos, followers and following
	userInfo["user-repos"].textContent = user.public_repos
	userInfo["user-followers"].textContent = user.followers
	userInfo["user-following"].textContent = user.following

	//Displays user's location, blog url, twitter, and company info and removes adds or removes opacity depending on if location is available
	if (user.location) {
		userInfo["user-location"].textContent = user.location
		userInfo["user-location"].classList.remove("opacity-50")
		userInfo["user-location"].previousElementSibling.classList.remove(
			"opacity-50"
		)
	} else {
		userInfo["user-location"].textContent = "Not Available"
		userInfo["user-location"].classList.add("opacity-50")
		userInfo["user-location"].previousElementSibling.classList.add(
			"opacity-50"
		)
	}
	if (user.blog) {
		userInfo["user-blog"].textContent = user.blog
		userInfo["user-blog"].classList.remove("opacity-50")
		userInfo["user-blog"].previousElementSibling.classList.remove(
			"opacity-50"
		)
	} else {
		userInfo["user-blog"].textContent = "Not Available"
		userInfo["user-blog"].classList.add("opacity-50")
		userInfo["user-blog"].previousElementSibling.classList.add("opacity-50")
	}
	if (user.twitter_username) {
		userInfo["user-twitter"].textContent = `@${user.twitter_username}`
		userInfo["user-twitter"].classList.remove("opacity-50")
		userInfo["user-twitter"].previousElementSibling.classList.remove(
			"opacity-50"
		)
	} else {
		userInfo["user-twitter"].textContent = "Not Available"
		userInfo["user-twitter"].classList.add("opacity-50")
		userInfo["user-twitter"].previousElementSibling.classList.add(
			"opacity-50"
		)
	}
	if (user.company) {
		userInfo["user-company"].textContent = `@${user.company}`
		userInfo["user-company"].classList.remove("opacity-50")
		userInfo["user-company"].previousElementSibling.classList.remove(
			"opacity-50"
		)
	} else {
		userInfo["user-company"].textContent = "Not Available"
		userInfo["user-company"].classList.add("opacity-50")
		userInfo["user-company"].previousElementSibling.classList.add(
			"opacity-50"
		)
	}
}

fetchData("https://api.github.com/users/octocat")
	.then((userInfo) => {
		displayUserInfo(userInfo)
	})
	.catch((err) => {
		console.log(err)
	})

applyProperTheme()
toggleDarkLight()
renderUserInfo()
