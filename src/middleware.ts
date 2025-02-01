import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard", "/profile", "/timer", "/api/timer/start"],
};
