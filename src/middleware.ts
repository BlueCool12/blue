import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const cookie = req.headers.get('cookie');
    console.log('🍪 미들웨어에서 받은 쿠키:', cookie);
    const token = req.cookies.get('token')?.value;
    console.log('🍪 미들웨어 token 쿠키:', token);

    if (url.pathname !== '/admin/login') {
        try {
            const response = await fetch(`https://bluecool.pyomin.com/api/auth/me`, {
                method: 'GET',
                headers: {
                    cookie: `token=${token}`,
                },
            });

            if (!response.ok) {
                url.pathname = '/admin/login';
                return NextResponse.redirect(url);
            }
        } catch {
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
}