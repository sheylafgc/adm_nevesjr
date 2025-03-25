import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";

type PublicRoute = {
  path: string | RegExp;
  whenAuthenticated: "redirect" | "next";
};

const publicRoutes: PublicRoute[] = [
  { path: "/auth/Login", whenAuthenticated: "redirect" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth/Login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("NEVESJR_TOKEN");

  const publicRoute = publicRoutes.find((route) => {
    if (typeof route.path === "string") {
      return route.path === path;
    } else {
      return route.path.test(path);
    }
  });

  if (authToken) {
    if (publicRoute?.whenAuthenticated === "redirect") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (!authToken) {
    if (publicRoute) {
      return NextResponse.next();
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|[^/]+\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff2?|ttf|eot)).*)",
  ],
};
