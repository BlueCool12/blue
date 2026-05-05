import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const LogoBorder = async () => {
    const t = await getTranslations('Posts');

    return (
        <div style={{ position: 'relative' }}>
            <Image
                src='/images/border.webp'
                alt={t('decorativeLogo')}
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