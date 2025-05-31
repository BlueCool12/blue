import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const cookieHeader = req.headers.get('cookie') || '';
    const tokenMatch = cookieHeader.match(/token=([^;]*)/);
    const token = tokenMatch?.[1];

    if (!token && path.startsWith('/admin') && path !== '/admin/login') {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/admin/login';
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};