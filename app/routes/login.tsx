import { Form } from "@remix-run/react";

export default function Login() {
    return (
      <>
      <Form action="/auth/auth0" method="post">
        <button>Login with Auth0</button>
      </Form>
      <Form action="/auth/asgardeo" method="post">
        <button>Login with Asgardeo</button>
      </Form>
      </>
    );
  }