const checkPhone = (phoneNumber) => {
    const regex = new RegExp('^09[0|1|2|3][0-9]{8}$');
    const result = regex.test(phoneNumber);

    return result;
}

export default checkPhone;