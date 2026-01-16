'use client';

import { useTrackPageView } from "@/hooks/useTrackPageView";

interface Props {
  slug: string;
}

export function PostViewTracker({ slug }: Props) {
  useTrackPageView(slug);

  return null;
}