import axios from "axios";

export const setGlobalToken = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeGlobalToken = () => {
    delete axios.defaults.headers.common["Authorization"];
};