import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// const AuthRoutes = ["/login", "/register"];
const privateRoutes = ["/dashboard", "/dashboard/profile", "/user","/user/profile", "/user/dashboard"];

function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const query = request.nextUrl.searchParams.get('logout');
  // console.log('query', typeof query, query);

  // Get accessToken from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  // console.log("AccessToken:", accessToken, pathname);

  // Redirect if trying to access private routes without accessToken
  if (
    !accessToken &&
    privateRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (query && query === 'true') {
    const response = NextResponse.redirect(new URL(`/login`, request.url));
    response.cookies.set("accessToken", "", { path: "/", maxAge: -1 });
    response.cookies.set("refreshToken", "", { path: "/", maxAge: -1 });
    return response;
  }

  // Clear the accessToken if logged in user tries to access auth routes (login/register)
  // if (AuthRoutes.includes(pathname) && accessToken) {
  //   const response = NextResponse.redirect(new URL(`/dashboard`, request.url));

  //   // Clear the accessToken cookie
  //   // response.cookies.set("accessToken", "", { path: "/", maxAge: -1 });
  //   // response.cookies.set("refreshToken", "", { path: "/", maxAge: -1 });

  //   return response;
  // }

  // Proceed to next middleware or the requested page
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: [
    "/user",
    "/admin",
    "/profile",
    "/dashboard/profile",
    "/profile/:page*",
    "/admin",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:page*",
  ],
};

export default middleware;
