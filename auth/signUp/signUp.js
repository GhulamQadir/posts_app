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

    userAccounts.push({ "firstName": firstName.value, "lastName": lastName.value, "email": email.value, "password": password.value })

    localStorage.setItem('userAccounts', JSON.stringify(userAccounts))
    localStorage.setItem('loggedInUser', JSON.stringify({ "email": email.value, "password": password.value }))

    window.location.replace('../../posts/posts.html')
}

if (localStorage.getItem('userAccounts') != null) {
    userAccounts = JSON.parse(localStorage.getItem('userAccounts'))

    console.log(JSON.parse(localStorage.getItem('loggedInUser')))
}

