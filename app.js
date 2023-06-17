function verifyUser() {
    if (localStorage.getItem('userAccounts') == null) {
        window.location.replace('auth/signUp/signUp.html')
    }
    else if (localStorage.getItem('userAccounts') != null && localStorage.getItem('loggedInUser') == null) {
        window.location.replace('auth/login/login.html')
    }
    else {
        window.location.replace('posts/posts.html')
    }
}