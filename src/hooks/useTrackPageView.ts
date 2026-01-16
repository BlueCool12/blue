import { pageViewApi } from "@/lib/api/pageViewApi";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function useTrackPageView(slug?: string) {
  const isCounted = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    isCounted.current = false;
  }, [pathname]);

  useEffect(() => {
    if (isCounted.current || !pathname) return;

    const referrer = document.referrer;

    pageViewApi.logPageView({
      url: pathname,
      referrer,
      slug: slug ?? null,
    });

    isCounted.current = true;
  }, [pathname, slug]);
}