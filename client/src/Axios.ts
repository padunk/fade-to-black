import Axios from "axios";

export const axios = Axios.create({
    baseURL: "https://us-central1-fade-to-black-f3f53.cloudfunctions.net/api",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
