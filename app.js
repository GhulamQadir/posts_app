function verifyUser() {
    if (localStorage.getItem('userAccounts') == null) {
        window.location.replace('auth/signUp/signUp.html')
    }
}