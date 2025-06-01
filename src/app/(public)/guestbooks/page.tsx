import { Metadata } from "next";
import GuestbookPage from "./Guestbook";



export const metadata: Metadata = {
    title: '방명록',
    description: 'BlueCool 블로그 방명록 페이지입니다.',
};

export default function GuestBookPage() {
    return <GuestbookPage />
}