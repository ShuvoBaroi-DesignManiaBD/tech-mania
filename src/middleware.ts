import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AuthRoutes = ["/login", "/register"];
const privateRoutes = ["/dashboard", "/dashboard/*"];

function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get accessToken from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("AccessToken:", accessToken);

  // Redirect if trying to access private routes without accessToken
  if (!accessToken && privateRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  // Clear the accessToken if logged in user tries to access auth routes (login/register)
  if (accessToken && AuthRoutes.includes(pathname)) {
    const response = NextResponse.redirect(new URL(`/dashboard`, request.url));
    
    // Clear the accessToken cookie
    response.cookies.set("accessToken", "", { path: "/", maxAge: -1 });
    response.cookies.set("refreshToken", "", { path: "/", maxAge: -1 });
    
    return response;
  }

  // Proceed to next middleware or the requested page
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/admin",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:page*",
  ],
};

export default middleware;
