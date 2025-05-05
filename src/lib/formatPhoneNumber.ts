export const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const onlyDigits = phone.replace(/\D/g, '');
    return onlyDigits.replace(/^(\d{4})(\d{3})(\d{0,3})$/, "$1 $2 $3").trim();
}

