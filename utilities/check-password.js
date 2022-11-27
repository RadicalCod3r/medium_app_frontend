const checkPassword = (password) => {
    const result = password.length >= 5;

    return result;
}

export default checkPassword;