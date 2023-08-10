import axios from 'axios'

const instance = axios.create({
    baseURL: "https://localhost:7199/api/ShopSync",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
});

export default instance