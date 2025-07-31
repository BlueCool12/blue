import { v4 as uuidv4 } from 'uuid';

export const ensureSessionId = () => {
    const cookieName = 'bluecool_sid';

    const cookieValue = document.cookie
        .split('; ')
        .find((c) => c.startsWith(`${cookieName}=`))
        ?.split('=')[1];

    if (cookieValue) {
        localStorage.setItem(cookieName, cookieValue);
        return cookieValue;
    }

    let sid = localStorage.getItem(cookieName);
    if (!sid) {
        sid = uuidv4();
        localStorage.setItem(cookieName, sid);
    }

    document.cookie = `${cookieName}=${sid}; path=/; max-age=2592000; domain=.pyomin.com; SameSite=None; Secure`;

    return sid;
}