export default function Head() {
    return (
        <>
            {/* 아이콘 */}
            <link rel="icon" href="/favicon.png" />

            {/* 테마 색상 (모바일 브라우저 바 색) */}
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

        </>
    );
}
