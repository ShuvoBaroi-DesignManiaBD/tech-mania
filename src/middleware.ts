import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AuthRoutes = ["/login", "/register"];
const privateRoutes = ["/dashboard", "/dashboard/*"];

// type Role = keyof typeof roleBasedRoutes;

// const roleBasedRoutes = {
//   USER: [/^\/profile/],
//   ADMIN: [/^\/admin/],
// };

// This function can be marked `async` if using `await` inside
function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(pathname, request.url);

  // const currentUser = useAppSelector(selectCurrentUser);
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(accessToken);
  if (!accessToken && privateRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/login`, request.url));
      //   }
      // } else {
      //   const decoded = jwtVerify(accessToken);
      //   if (decoded) {
      //   return NextResponse.next();
    } else if (accessToken && AuthRoutes.includes(pathname)){
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/admin",
    // "/login",
    // "/register",
    "/dashboard",
    "/dashboard/:page*",
  ],
};

// const middleware = () => {
//   return null;
// };

export default middleware;
