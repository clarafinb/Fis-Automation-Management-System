export const handleKeypressEnter = (e,callback) => {
    if (e.which === 13) {
        callback();
    }
}