import dynamic from "next/dynamic";


const Edit = dynamic(() => import('@/components/admin/EditPostPage'), { ssr: false });

export default function Page() {
    return <Edit />;
}