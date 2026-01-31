import { v4 as uuidv4 } from 'uuid';

export const ensureClientId = () => {
    const CID_KEY = 'bluecool_cid';

    const cookieValue = document.cookie
        .split('; ')
        .find((c) => c.startsWith(`${CID_KEY}=`))
        ?.split('=')[1];

    let cid = cookieValue;
    if (!cid) {
        cid = localStorage.getItem(CID_KEY) || undefined;        
    }

    if (!cid) {
        cid = uuidv4();        
    }

    localStorage.setItem(CID_KEY, cid);
    document.cookie = `${CID_KEY}=${cid}; path=/; max-age=31536000; domain=.pyomin.com; SameSite=None; Secure`;

    return cid;
};

export const ensureSessionId = () => {
    const SID_KEY = 'bluecool_sid';

    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
        sid = uuidv4();
        sessionStorage.setItem(SID_KEY, sid);
    }

    return sid;
};