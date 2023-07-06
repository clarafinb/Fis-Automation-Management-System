const separateComma = (value) => {
    const numericValue = value.replace(/[^\d.]/g, '');
    const formattedValue = numericValue.replace(/(\..*)\./g, '$1');
    const parts = formattedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export { separateComma }