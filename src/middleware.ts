import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const url = req.nextUrl.clone();

    if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
        if (!token) {
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
}