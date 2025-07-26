
export const getDailySeed = () => {
    const KST = new Date(Date.now() + 9 * 60 * 60 * 1000); // UTC+9 보정
    return KST.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};

export const seededShuffle = <T,>(array: T[], seed: string): T[] => {
    const result = [...array];
    let s = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let i = result.length - 1; i > 0; i--) {
        s = (s * 9301 + 49297) % 233280;
        const j = Math.floor((s / 233280) * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}