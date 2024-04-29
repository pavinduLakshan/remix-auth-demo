import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/utils/auth0.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};