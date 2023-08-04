let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
let createPostPopup = document.getElementById('createPostPopup')
let userProfile = document.getElementsByClassName('userProfile')
let userName = document.getElementById('profile_userName')
let email = document.getElementById('user_email')
let whatsInMindInput = document.getElementById('whatsInMindInput')
let navbar = document.getElementById('my_nav')
let mainDiv = document.getElementById('mainDiv')
let userNameInPostDiv = document.getElementById('userNameInPostDiv')
let writePostInput = document.getElementById('writePostInput')
let coloPickerDiv = document.getElementById('colorPickerDiv')
let selectColorsDiv = document.getElementById('selectColorsDiv')
let postAreaDiv = document.getElementById('postAreaDiv')
let colorPickerIcon = document.getElementById('colorPickerIcon')
let pickLocationBtn = document.getElementById('pickLocationBtn')
let feelingDiv = document.getElementById('feelingDivPopUp')
let pickFeelingsDiv = document.getElementById('pickFeelingsDiv')
let locationMapImg = document.getElementById('locationMapImg')
let usersPostsDiv = document.getElementById('usersPostsDiv')







let userAccounts = JSON.parse(localStorage.getItem('usersPostAppAccounts'))
let usersPostsArray = []



document.body.style.backgroundColor = "whitesmoke"

let getUser = "";
let userAvatar = ""

for (var i in userAccounts) {
    if (userAccounts[i].email === loggedInUser.email && userAccounts[i].password === loggedInUser.password) {
        getUser = userAccounts[i]
        console.log(getUser)
    }
}



// capitalizing first name
let firstNameChar1 = getUser.firstName.slice(0, 1)
firstNameChar1 = firstNameChar1.toUpperCase();
let firstNameOtherChars = getUser.firstName.slice(1)
firstNameOtherChars = firstNameOtherChars.toLowerCase();
let firstName = firstNameChar1 + firstNameOtherChars


// capitalizing last name
let lastNameChar1 = getUser.lastName.slice(0, 1)
lastNameChar1 = lastNameChar1.toUpperCase();
let lastNameOtherChars = getUser.lastName.slice(1)
lastNameOtherChars = lastNameOtherChars.toLowerCase();
let lastName = lastNameChar1 + lastNameOtherChars



// POST DATA VARIABLES
let feeling = ""
let feelingEmoji = ""
let pickedLocation = ""
let backgroundColor = "white"
let userNameWithFeelingAndLocation = `${firstName} ${lastName}`




let gender = getUser.gender
for (var i = 0; i < userProfile.length; i++) {
    if (gender === "Male") {
        userProfile[i].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1RG337I68YvdKNXWsQpDq1SE2YBkkMCL2hsUJzmG2NrSzyGn_AdeOUZtzhUzFfJ_spTs&usqp=CAU"
        userAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1RG337I68YvdKNXWsQpDq1SE2YBkkMCL2hsUJzmG2NrSzyGn_AdeOUZtzhUzFfJ_spTs&usqp=CAU"
    }
    else if (gender === "Female") {
        userProfile[i].src = "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-woman-silhouette-on-white-background-png-image_4853542.png"
        userAvatar = "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-woman-silhouette-on-white-background-png-image_4853542.png"
    }
}


userName.innerHTML = `${getUser.firstName} ${getUser.lastName}`
email.innerHTML = `${getUser.email}`
whatsInMindInput.placeholder = `What's on your mind, ${getUser.firstName}?`
writePostInput.placeholder = `What's on your mind, ${getUser.firstName}?`
userNameInPostDiv.innerHTML = `${firstName} ${lastName}`





function gotosignup() {
    window.location.assign('../auth/signUp/signUp.html')
}



// newwwwwwwwwwwwwwwwwwwwwww
function openCreatePostDiv() {
    createPostPopup.className += " open"
    document.body.style.backgroundColor = "rgb(240, 240, 240)"
    navbar.style.backgroundColor = "rgb(240, 240, 240)"
}

function closeDiv() {
    createPostPopup.className = "createPostDiv"
    document.body.style.opacity = "1"
    document.body.style.backgroundColor = "whitesmoke"
    navbar.style.backgroundColor = "white"
}


function logOut() {
    localStorage.removeItem('loggedInUser')
    window.location.replace('../auth/login/login.html')
}


function thisBackgroundColor(thisColor) {
    let colorName = thisColor.classList[1]
    postAreaDiv.style.backgroundColor = `${colorName}`
    writePostInput.style.backgroundColor = `${colorName}`
    writePostInput.className += " textAreaStyleForColor"
    backgroundColor = colorName
}
function showColorOptions() {
    colorPickerIcon.style.display = "none"
    selectColorsDiv.style.display = "inline-block"
}

function hideColorPicker() {

    colorPickerIcon.style.display = "inline-block"
    selectColorsDiv.style.display = "none"
}



// LOCATION PICKER

function pickLocation() {
    pickLocationBtn.innerHTML = '<div id="loader"></div>'
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);

    } else {
        console.log("Geolocation is not supported by this browser.");
        pickLocationBtn.innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
    }
}


const success = (position) => {
    let { latitude, longitude } = position.coords

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=78f2f54e689d468192de7b9c6b5ca149`)
        .then(response => response.json()).then(result => {
            let { house_number, neighbourhood, city, country } = result.results[0].components
            console.log(`${firstName} ${lastName} is at ${city}, ${country}`)

            pickLocationBtn.innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>'

            pickedLocation = `${city}`

            if (feeling === "") {
                userNameInPostDiv.innerHTML = `${firstName} ${lastName} is in ${pickedLocation}.`
                userNameWithFeelingAndLocation = `${firstName} ${lastName} is in ${pickedLocation}.`
            }
            else if (feeling != "") {
                userNameInPostDiv.innerHTML = `${firstName} ${lastName} is ${feelingEmoji} feeling ${feeling} at ${pickedLocation}.`
                userNameWithFeelingAndLocation = `${firstName} ${lastName} is ${feelingEmoji} feeling ${feeling} at ${pickedLocation}.`
            }
        })

    console.log(latitude, longitude)


}


const error = (error) => {
    if (error.code === 1) {
        console.log("your browser is not supporting")
        pickLocationBtn.innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
    }
    if (error.code === 2) {
        console.log("location not available")
        pickLocationBtn.innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
    }
    else {
        console.log("something went wrong")
        pickLocationBtn.innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
    }
}








function showFeelingDiv() {
    feelingDiv.className += " openFeelingDiv"
    createPostPopup.className = "createPostDiv"

}


function backToPostDiv() {

    createPostPopup.className += " open"
    feelingDiv.className = "feelingDiv"
}


let emojisArray = [{ emoji: "😃", feeling: "happy" }, { emoji: "😇", feeling: "blessed" }, { emoji: "🥰", feeling: "loved" }, { emoji: "😔", feeling: "sad" }, { emoji: "🤩", feeling: "excited" }, { emoji: "🥰", feeling: "lovely" }, { emoji: "🤪", feeling: "crazy" }, { emoji: "😊", feeling: "thankful" }, { emoji: "😠", feeling: "angry" }, { emoji: "🤪", feeling: "silly" }, { emoji: "🌝", feeling: "amused" }, { emoji: "😴", feeling: "tired" }, { emoji: "🤔", feeling: "thoughtful" }, { emoji: "😀", feeling: "proud" }]


function showFeelingsOptions() {
    for (var i = 0; i < emojisArray.length; i++) {
        pickFeelingsDiv.innerHTML += `<button onclick="pickFeeling('${emojisArray[i].emoji}','${emojisArray[i].feeling}')" class="feelingsBtns"><span class="feelingBtnEmoji">${emojisArray[i].emoji}</span><span class="feelingBtnText">${emojisArray[i].feeling}</span></button>`
    }
}
showFeelingsOptions()


function pickFeeling(emoji, usersFeelinggg) {
    createPostPopup.className += " open"
    feelingDiv.className = "feelingDiv"


    feeling = usersFeelinggg
    feelingEmoji = emoji

    if (pickedLocation === "") {
        userNameInPostDiv.innerHTML = `${firstName} ${lastName} is ${feelingEmoji} feeling ${feeling}.`
        userNameWithFeelingAndLocation = `${firstName} ${lastName} is ${feelingEmoji} feeling ${feeling}.`
    }
    else if (pickedLocation != "") {
        userNameInPostDiv.innerHTML = `${firstName} ${lastName} is ${feelingEmoji} feeling ${feeling} at ${pickedLocation}.`
        userNameWithFeelingAndLocation = `${firstName} ${lastName} is ${feelingEmoji} feeling ${feeling} at ${pickedLocation}.`
    }
}



function likePost(e, time) {


    let postToLike;
    // for (var i in usersPostsArray) {
    //     if (usersPostsArray[i].time === time) {
    //         console.log(usersPostsArray[i])
    //         // postToLike = usersPostsArray[i]
    //         // if (!postToLike.isLiked){

    //         // }
    //     }
    // }


    for (var i in usersPostsArray) {
        if (usersPostsArray[i].time === time) {
            if (usersPostsArray[i].isLiked === false) {

                usersPostsArray[i].isLiked = true

                e.firstChild.style.color = "rgb(16, 16, 238)"
                e.childNodes[1].style.color = "rgb(16, 16, 238)"

                getUser.posts = usersPostsArray
                localStorage.setItem("usersPostAppAccounts", JSON.stringify(userAccounts));
            }
            else if (usersPostsArray[i].isLiked === true) {


                usersPostsArray[i].isLiked = false

                e.firstChild.style.color = "grey"
                e.childNodes[1].style.color = "rgb(93, 92, 92)"

                getUser.posts = usersPostsArray
                localStorage.setItem("usersPostAppAccounts", JSON.stringify(userAccounts));
            }
        }
    }
}


function getPostsFromLocalStorage() {
    if (getUser.posts != null) {
        usersPostsArray = getUser.posts

        for (var i in usersPostsArray) {
            let color = "black"
            let iconTextcolor = "grey"
            let momentOfPost = moment(new Date(usersPostsArray[i].time), "YYYYMMDD").fromNow();

            if (usersPostsArray[i].backgroundColor != "white") {
                color = "white"
            }
            // if (usersPostsArray[i].backgroundColor === "white") {
            //     color = "black"
            // }
            if (usersPostsArray[i].isLiked === true) {
                iconTextcolor = "rgb(16, 16, 238)"
            }
            // if(usersPostsArray[i].isLiked===false){
            //     iconTextcolor="grey"
            // }
            if (usersPostsArray[i].feeling === "" && usersPostsArray[i].location === "") {
                usersPostsDiv.innerHTML += `<div class="postDiv">
            <div class="postUpperDiv">
            <img class="userAvatarInPost" src="${userAvatar}" />
            <p class="userNameInPost">${firstName} ${lastName}</p>
            <br />
            <p class="timeOfPost">${momentOfPost}</p>
            </div>
            <div style="background-color: ${usersPostsArray[i].backgroundColor}; color: ${color};" class="postMainDiv">
            <p class="postContent">${usersPostsArray[i].content}</p>
            </div>
            <div class="postFooterDiv">
            <button onclick="likePost(this,'${usersPostsArray[i].time}')" class="footerBtns"><i style="color: ${iconTextcolor};" class="fa fa-thumbs-o-up footerBtnIcons" aria-hidden="true"></i><span style="color: ${iconTextcolor};" class="footerBtnText">Like</span></button>
            <button class="footerBtns"><i class="fa fa-comment-o footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Comment</span></button>
            <button class="footerBtns"><i class="fa fa-share footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Share</span></button>    
            </div>
            </div>`
            }

            if (usersPostsArray[i].feeling === "" && usersPostsArray[i].location != "") {
                usersPostsDiv.innerHTML += `<div class="postDiv">
            <div class="postUpperDiv">
            <img class="userAvatarInPost" src="${userAvatar}" />
            <p class="userNameInPost">${firstName} ${lastName} is in ${usersPostsArray[i].location}.</p>
            <br />
            <p class="timeOfPost">${momentOfPost}</p>
            </div>
            <div style="background-color: ${usersPostsArray[i].backgroundColor}; color: ${color};" class="postMainDiv">
            <p class="postContent">${usersPostsArray[i].content}</p>
            </div>
            <div class="postFooterDiv">
            <button onclick="likePost(this,'${usersPostsArray[i].time}')" class="footerBtns"><i style="color: ${iconTextcolor};" class="fa fa-thumbs-o-up footerBtnIcons" aria-hidden="true"></i><span style="color: ${iconTextcolor};" class="footerBtnText">Like</span></button>
            <button class="footerBtns"><i class="fa fa-comment-o footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Comment</span></button>
            <button class="footerBtns"><i class="fa fa-share footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Share</span></button>    
            </div>
            </div>`
            }
            if (usersPostsArray[i].feeling != "" && usersPostsArray[i].location === "") {
                usersPostsDiv.innerHTML += `<div class="postDiv">
            <div class="postUpperDiv">
            <img class="userAvatarInPost" src="${userAvatar}" />
            <p class="userNameInPost">${firstName} ${lastName} is ${usersPostsArray[i].feelingEmoji} feeling ${usersPostsArray[i].feeling}.</p>
            <br />
            <p class="timeOfPost">${momentOfPost}</p>
            </div>
            <div style="background-color: ${usersPostsArray[i].backgroundColor}; color: ${color};" class="postMainDiv">
            <p class="postContent">${usersPostsArray[i].content}</p>
            </div>
            <div class="postFooterDiv">
            <button onclick="likePost(this,'${usersPostsArray[i].time}')" class="footerBtns"><i style="color: ${iconTextcolor};" class="fa fa-thumbs-o-up footerBtnIcons" aria-hidden="true"></i><span style="color: ${iconTextcolor};" class="footerBtnText">Like</span></button>
            <button class="footerBtns"><i class="fa fa-comment-o footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Comment</span></button>
            <button class="footerBtns"><i class="fa fa-share footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Share</span></button>
            </div>
            </div>`
            }
            if (usersPostsArray[i].feeling != "" && usersPostsArray[i].location != "") {
                usersPostsDiv.innerHTML += `<div class="postDiv">
            <div class="postUpperDiv">
            <img class="userAvatarInPost" src="${userAvatar}" />
            <p class="userNameInPost">${firstName} ${lastName} is ${usersPostsArray[i].feelingEmoji} feeling ${usersPostsArray[i].feeling} at ${usersPostsArray[i].location}.</p>
            <br />
            <p class="timeOfPost">${momentOfPost}</p>
            </div>
            <div style="background-color: ${usersPostsArray[i].backgroundColor}; color: ${color};" class="postMainDiv">
            <p class="postContent">${usersPostsArray[i].content}</p>
            </div>
            <div class="postFooterDiv">
            <button onclick="likePost(this,'${usersPostsArray[i].time}')" class="footerBtns"><i style="color: ${iconTextcolor};" class="fa fa-thumbs-o-up footerBtnIcons" aria-hidden="true"></i><span style="color: ${iconTextcolor};" class="footerBtnText">Like</span></button>
            <button class="footerBtns"><i class="fa fa-comment-o footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Comment</span></button>
            <button class="footerBtns"><i class="fa fa-share footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Share</span></button>
            </div>
            </div>`
            }
        }
    }

}
getPostsFromLocalStorage()







function addPost() {
    let postTime = new Date().toString();
    if (writePostInput.value === "") {
        console.log("please write your value in field")
    }
    else {
        let color = ""
        if (backgroundColor != "white") {
            color = "white"
        }
        else {
            color = "black"
        }
        let momentOfPost = moment(new Date(postTime), "YYYYMMDD").fromNow();
        usersPostsArray.push({ feeling: feeling, feelingEmoji: feelingEmoji, backgroundColor: backgroundColor, content: writePostInput.value, location: pickedLocation, time: postTime, isLiked: false })
        getUser.posts = usersPostsArray

        localStorage.setItem("usersPostAppAccounts", JSON.stringify(userAccounts));

        createPostPopup.className = "createPostDiv"


        usersPostsDiv.innerHTML += `<div class="postDiv">
        <div class="postUpperDiv">
        <img class="userAvatarInPost" src="${userAvatar}" />
        <span class="userNameInPost">${userNameWithFeelingAndLocation}</span>
        <br />
        <span class="timeOfPost">${momentOfPost}</span>
        </div>
        <div style="background-color: ${backgroundColor}; color: ${color};" class="postMainDiv">
        <p class="postContent">${writePostInput.value}</p>
        </div>
        <div class="postFooterDiv">
        <button onclick="likePost(this,'${momentOfPost}')" class="footerBtns"><i class="fa fa-thumbs-o-up footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Like</span></button>
        <button class="footerBtns"><i class="fa fa-comment-o footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Comment</span></button>
        <button class="footerBtns"><i class="fa fa-share footerBtnIcons" aria-hidden="true"></i><span class="footerBtnText">Share</span></button>
        </div>
        </div>`


    }
}



