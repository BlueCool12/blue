import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {

        try {
            const response = await fetch(`https://bluecool.pyomin.com/api/auth/me`, {
                method: 'GET',
                headers: {
                    cookie: req.headers.get('cookie') || '',
                },
            });

            if (!response.ok) {
                url.pathname = '/admin/login';
                return NextResponse.redirect(url);
            }
        } catch (err) {
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
}