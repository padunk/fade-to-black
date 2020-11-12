import Axios from "axios";

const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://us-central1-fade-to-black-f3f53.cloudfunctions.net/api"
        : "http://localhost:5001/fade-to-black-f3f53/us-central1/api";

export const axios = Axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
