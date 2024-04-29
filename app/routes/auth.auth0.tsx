import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth0.server";

export const loader = () => redirect("/login");

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("auth0", request);
};