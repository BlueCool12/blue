import { useEffect, useState } from "react"

export const useIsMobile = (breakpoint = 1024) => {
    const [isMobile, setIsMobile] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
            setReady(true);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return { isMobile, ready };
}