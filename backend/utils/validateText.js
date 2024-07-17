function isValid(firstName, lastName, email, username, password, confirmPassword, gender) {
    if (
        firstName && firstName.trim() === "" ||
        lastName && lastName.trim() === "" ||
        email && email.trim() === "" ||
        username && username.trim() === "" ||
        password && password.trim() === "" ||
        confirmPassword && confirmPassword.trim() === "" ||
        gender && gender.trim() === "") {
        return false
    }

    return true
}

export default isValid;
