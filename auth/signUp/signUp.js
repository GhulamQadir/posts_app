let userAccounts = []

let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let password = document.getElementById('password')





function goToLoginPage() {

    window.location.assign('../login/login.html')
}

function signUp() {
    event.preventDefault()
    let radios = document.getElementsByName('gender')
    let gender = "";

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value
        }
    }
    if (gender === "") {
        alert("please select your gender")
    }
    else {
        userAccounts.push({ "firstName": firstName.value, "lastName": lastName.value, "email": email.value, "password": password.value, gender: gender })

        localStorage.setItem('usersPostAppAccounts', JSON.stringify(userAccounts))
        localStorage.setItem('loggedInUser', JSON.stringify({ "email": email.value, "password": password.value }))

        window.location.replace('../../posts/posts.html')

    }


}

if (localStorage.getItem('usersPostAppAccounts') != null) {
    userAccounts = JSON.parse(localStorage.getItem('usersPostAppAccounts'))

    console.log(JSON.parse(localStorage.getItem('loggedInUser')))
}

