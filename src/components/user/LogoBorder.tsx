import Image from "next/image";

export const LogoBorder = () => {

    return (
        <div style={{ position: 'relative' }}>
            <Image
                src='/images/border.webp'
                alt='장식용 로고'
                width={80}
                height={53}
                style={{
                    position: 'absolute',
                    bottom: '-0.5rem',
                    left: '1rem',
                }}
            />
            <div style={{ borderBottom: '2px solid var(--border-color)' }} />
        </div>
    );
};