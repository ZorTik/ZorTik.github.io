import {RequestInit} from "next/dist/server/web/spec-extension/request";
import {Claims} from "@auth0/nextjs-auth0";

const baseUrl = process.env.AUTH0_ISSUER_BASE_URL;

let currentToken: string|null = null;
let expirationTime: number|null = null;

async function bearer() {
    if (!currentToken || expirationTime!! < Date.now()) {
        console.log("Fetching new Auth0 token");
        const clientId = process.env.AUTH0_CLIENT_ID;
        const clientSecret = process.env.AUTH0_CLIENT_SECRET;
        const response = await fetch(`${baseUrl}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&audience=${baseUrl}/api/v2/`,
        }).then(res => res.json());

        if (response.error) console.error(response.error);

        currentToken = response.access_token;
        expirationTime = Date.now() + response.expires_in * 1000;
    }
    return currentToken;
}

async function prepareAuth0Request(init: RequestInit): Promise<RequestInit> {
    const token = await bearer();
    return {
        ...init,
        headers: {
            ...init.headers,
            Authorization: `Bearer ${token}`,
        }
    }
}

async function getAuth0Permissions(user: Claims) {
    const request = await prepareAuth0Request({
        method: "GET",
    });
    return await fetch(`${baseUrl}/api/v2/users/${user.sub}/permissions`, request)
        .then(res => res.json())
        .then(res => res.map((permission: any) => permission.permission_name));
}

export {
    bearer,
    prepareAuth0Request,
    getAuth0Permissions,
}
