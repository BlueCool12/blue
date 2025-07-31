import { v4 as uuidv4 } from 'uuid';

export const ensureSessionId = () => {
    const cookieName = 'bluecool_sid';

    const existing = document.cookie
        .split('; ')
        .find((c) => c.startsWith(cookieName + '='));

    if (existing) return;

    const newId = uuidv4();
    document.cookie = `${cookieName}=${newId}; path=/; max-age=2592000; domain=.pyomin.com; SameSite=None; Secure`;
}