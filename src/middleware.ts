// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Proteger la ruta /presupuesto
  if (path === "/presupuesto") {
    const isAuthenticated = request.cookies.get("admin-auth")?.value === "true";

    if (!isAuthenticated) {
      // Redirigir al home si no está autenticado
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/presupuesto",
};
