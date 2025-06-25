const anonymousNicknames = [
    "익명의먼치킨",
    "익명의사모예드",
    "익명의개발자",
    "익명의고구마",
    "익명의개구리",
    "익명의티라노",
    "익명의햄스터",
    "익명의알파카",
];

export function getRandomAnonymousNickname(): string {
    const index = Math.floor(Math.random() * anonymousNicknames.length);
    return anonymousNicknames[index];
}