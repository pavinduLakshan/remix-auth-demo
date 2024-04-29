import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { createCookieSessionStorage } from "@remix-run/node";

interface User {
    id: string;
    name: string;
}

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cr3t"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "http://localhost:5173/auth/auth0/callback",
    clientID: process.env.AUTH0_CLIENT_ID ?? "",
    clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
    domain: process.env.AUTH0_TENANT_DOMAIN ?? "",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log({accessToken, refreshToken, extraParams})
    // Get the user data from your DB or API using the tokens and profile
    return {
        id: 'djjd',
        name: profile.displayName
    } as User;
  }
);

authenticator.use(auth0Strategy);

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;