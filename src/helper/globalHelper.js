import moment from 'moment';

export const downloadFileConfig = (data, fileName = 'file.xlsx') => {
    // create file link in browser's memory
    const href = URL.createObjectURL(data);
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
};

export const formatStandartDate = (date) => {
    return moment(date).format('DD-MM-YYYY')
}

export const formatDateInput = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

export const handleDecimalsOnValue = (value) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,10})/s;
    return value.match(regex)[0];
}
