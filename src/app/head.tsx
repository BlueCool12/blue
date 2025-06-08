export default function Head() {
    return (
        <>
            {/* 아이콘 */}
            <link rel="icon" href="/images/logo/small.png" />

            {/* 테마 색상 (모바일 브라우저 바 색) */}
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

            {/* 사이트 인증 */}
            <meta name="google-site-verification" content="a_U5y0WSCgz0M6vCAXxFu6HFYeMcpYpbxrmX25W_veQ" />
        </>
    );
}
