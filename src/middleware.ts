import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware((context, next) => {
  const { url } = context

  // Redirect /dev routes to home page in production
  if (!import.meta.env.DEV && url.pathname.startsWith("/dev/")) {
    return Response.redirect(new URL("/", url.origin), 301)
  }

  return next()
})
