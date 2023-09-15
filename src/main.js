// When the search button is clicked, retrieve the data input in the search box
const renderUserInfo = () => {
	const inputUserName = document.querySelector("#search-text")
	const userSearchBtn = document.querySelector("#user-search-btn")
	const searchErrMsgDesktop = document.querySelector("#search-err-msg-desktop")
	const searchErrMsgMobile = document.querySelector("#search-err-msg-mobile")

	userSearchBtn.addEventListener("click", (e) => {
		//Remove error messages if they exist
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
		// userUrl = `https://github.com/`
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

const displayUserInfo = (user) => {
	const userAvatarDesktop = document.querySelector("#user-avatar-desktop")
	const userAvatarMobile = document.querySelector("#user-avatar-mobile")
	const userName = document.querySelector("#user-name")
	const userLoginName = document.querySelector("#user-login-name")
	const userDateJoined = document.querySelector("#user-date-joined")
	const userBio = document.querySelector("#user-bio")
	const userRepos = document.querySelector("#user-repos")
	const userFollowers = document.querySelector("#user-followers")
	const userFollowing = document.querySelector("#user-following")
	const userLocation = document.querySelector("#user-location")
	const userBlog = document.querySelector("#user-blog")
	const userTwitter = document.querySelector("#user-twitter")
	const userCompany = document.querySelector("#user-company")

	userAvatarDesktop.src = user.avatar_url
	userAvatarMobile.src = user.avatar_url

	if (user.name) {
		userName.textContent = user.name
	} else {
		userName.textContent = user.login
	}

	userLoginName.textContent = `@${user.login}`

	const dateCreated = new Date(user.created_at)
	const createdDay = dateCreated.getDate()
	const createdMonth = months[dateCreated.getMonth()]
	const createdYear = dateCreated.getFullYear()
	userDateJoined.textContent = `Joined ${createdDay} ${createdMonth} ${createdYear}`

	if (user.bio) {
		userBio.textContent = user.bio
	} else {
		userBio.textContent = "The profile has no bio"
	}

	userRepos.textContent = user.public_repos
	userFollowers.textContent = user.followers
	userFollowing.textContent = user.following

	if (user.location) {
		userLocation.textContent = user.location
		userLocation.classList.remove("opacity-50")
		userLocation.previousElementSibling.classList.remove("opacity-50")
	} else {
		userLocation.textContent = "Not Available"
		userLocation.classList.add("opacity-50")
		userLocation.previousElementSibling.classList.add("opacity-50")
	}
	if (user.blog) {
		userBlog.textContent = user.blog
		userBlog.classList.remove("opacity-50")
		userBlog.previousElementSibling.classList.remove("opacity-50")
	} else {
		userBlog.textContent = "Not Available"
		userBlog.classList.add("opacity-50")
		userBlog.previousElementSibling.classList.add("opacity-50")
	}
	if (user.twitter_username) {
		userTwitter.textContent = `@${user.twitter_username}`
		userTwitter.classList.remove("opacity-50")
		userTwitter.previousElementSibling.classList.remove("opacity-50")
	} else {
		userTwitter.textContent = "Not Available"
		userTwitter.classList.add("opacity-50")
		userTwitter.previousElementSibling.classList.add("opacity-50")
	}
	if (user.company) {
		userCompany.textContent = `@${user.company}`
		userCompany.classList.remove("opacity-50")
		userCompany.previousElementSibling.classList.remove("opacity-50")
	} else {
		userCompany.textContent = "Not Available"
		userCompany.classList.add("opacity-50")
		userCompany.previousElementSibling.classList.add("opacity-50")
	}
}

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

fetchData("https://api.github.com/users/octocat")
	.then((userInfo) => {
		displayUserInfo(userInfo)
	})
	.catch((err) => {
		console.log(err)
	})

renderUserInfo()
