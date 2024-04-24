import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
]);

const isProtectedRoute = createRouteMatcher([
  '/organization(.*)',
  '/select-org(.*)',
]);
 
export default clerkMiddleware((auth, req) => {
  if (auth().userId && isPublicRoute(req)) {
    const orgSelection = new URL(auth().orgId ? `/organization/${auth().orgId}` : '/select-org', req.url)
    return NextResponse.redirect(orgSelection)
  } 
  if (isProtectedRoute(req)) auth().protect();

  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== '/select-org') {
    const orgSelection = new URL('/select-org', req.url)
    return NextResponse.redirect(orgSelection)
  }
});


export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};