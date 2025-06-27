
export const LogoBorder = () => {

    return (
        <div style={{ position: 'relative' }}>
            <img src='/images/border.png' style={{ width: '5rem', position: 'absolute', bottom: '-0.5rem', left: '1rem' }} />
            <div style={{ borderBottom: '2px solid var(--border-color)' }} />
        </div>
    );
};