'use client';

import { toast } from "react-toastify";

export default function Page() {

    const handleGenerateSitemap = async () => {
        fetch('http://localhost:8888/files/sitemaps/download')
            .then(response => {
                if (!response.ok) {
                    toast.error('다운로드 실패');
                    throw new Error('다운로드 실패');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sitemap.zip';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                toast.error('Sitemap 생성 중 오류 발생');
            });
    };

    return (
        <>
            <button
                style={{
                    padding: '0.7rem 1.5rem',
                    backgroundColor: 'var(--btn-bg)',
                    color: 'var(--btn-color)',
                    fontSize: '1rem',
                    fontWeight: '600'
                }}
                onClick={handleGenerateSitemap}>SITEMAP
            </button>
        </>
    );
};