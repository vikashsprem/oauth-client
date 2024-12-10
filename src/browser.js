export default {
    saveToken(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getToken(key) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
};
