let email = document.getElementById('email')
let password = document.getElementById('password')

let userAccounts = JSON.parse(localStorage.getItem('userAccounts'))



function goToSignUpPage() {
    window.location.assign('../signUp/signUp.html')
}


function login() {
    event.preventDefault()

    for (var i = 0; i < userAccounts.length; i++) {
        if (userAccounts[i].email === email.value && userAccounts[i].password === password.value) {

            localStorage.setItem('loggedInUser', JSON.stringify({ "email": email.value, "password": password.value }))

            email.value = ""
            password.value = ""
            window.location.replace('../../posts/posts.html')
        } else {
            console.log("not matched")
        }
    }

}



