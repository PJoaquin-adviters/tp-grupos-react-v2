import axios from "axios";
import camelcaseKeys from "camelcase-keys";
// import { env } from "./config";
const httpClient = axios.create({
    baseURL: "https://bootcamp-adviters.herokuapp.com",
});
export const Method = {
    GET: "GET",
    PUT: "PUT",
    PATCH: "PATCH",
    POST: "POST",
    DELETE: "DELETE",
};

export const login = async (email, password) => {
    const headers = {
        "Content-Type": "application/json",
    };

    const request = {
        method: Method.POST,
        headers,
        url: "/login",
        data: {
            email: email,
            password: password,
        },
    };

    try {
        const promise = httpClient.request(request);
        const {
            data: { accessTokenId },
        } = await promise;
        localStorage.setItem("localToken", accessTokenId);
        return camelcaseKeys(accessTokenId, { deep: true });
    } catch (error) {
        throw new Error("[getLogin service error]: " + error);
    }

};

export const fetchContent = async (url, config = {}) => {
    try {
        const { headers: headersOptions } = config;
        const token = localStorage.getItem("localToken");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...headersOptions,
        };

        const { body, ...options } = config;
        const source = axios.CancelToken.source();
        const request = {
            cancelToken: source.token,
            method: Method.GET,
            headers,
            ...options,
            url,
        };
        if (body) {
            request.data = body;
        }
        const promise = httpClient.request(request);
        promise.cancel = () => source.cancel("cancelled");
        const { data } = await promise;
        if (data?.error) {
            throw new Error(data.error);
        }
        return camelcaseKeys(data, { deep: true });
    } catch (error) {
        console.info(error);
        throw error;
    }
};

