"use client"


const USER_URL = `${process.env.AUTH_SERVER_URL}/api/user`;
const LOGOUT_URL = `${process.env.AUTH_SERVER_URL}/api/logout`;
const LOGIN_URL = `${process.env.AUTH_SERVER_URL}/api/login`;
const REGISTER_URL = `${process.env.AUTH_SERVER_URL}/api/register`;

export const getUser = async () => {
    try {
        const response = await fetch(USER_URL, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            credentials: "include", // include, *same-origin, omit
        });
        return [await response.json(), response.status];
    } catch (err) {
        console.log(err);
        return [{ data: "Something went wrong" }, 400];
    }
}


export const registerUser = async (data) => {
    try {
        const response = await fetch(REGISTER_URL, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return [await response.json(), response.status];
    } catch (err) {
        console.log(err);
        return [{ detail: "Something went wrong" }, 400];
    }
}

export const authenticateUser = async (data) => {
    try {
        const response = await fetch(LOGIN_URL, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return [await response.json(), response.status];
    } catch (err) {
        console.log(err);
        return [{ detail: "Something went wrong" }, 400];
    }
}

export const logoutCurUser = async () => {
    try {
        const response = await fetch(LOGOUT_URL, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });
        return [await response.json(), response.status];
    } catch (err) {
        console.log(err);
        return [{ detail: "Something went wrong" }, 400];
    }
}
