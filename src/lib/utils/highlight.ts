import { codeToHtml } from "shiki";

export async function highlightCodeBlocksWithShiki(html: string): Promise<string> {
    const regex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

    const matches = [...html.matchAll(regex)];

    let result = html;

    for (const match of matches) {
        const [original, lang, rawCode] = match;
        const decoded = decodeHTMLEntities(rawCode);

        const highlighted = await codeToHtml(decoded, {
            lang,
            theme: 'github-dark', // 원하는 테마로 변경 가능
        });

        const wrapped = `
            <div style="position: relative; margin: 1rem 0; border-radius: 0.5rem; background: #0d1117;">
            <div style="
                position: absolute;
                top: 0.3rem;
                right: 0.3rem;
                background-color: rgba(31, 111, 235, 0.6);
                color: white;
                font-size: 0.75rem;
                font-weight: bold;
                padding: 0.2rem 0.6rem;
                border-radius: 0.4rem;
                text-transform: uppercase;                
            ">${lang}</div>
            ${highlighted}
            </div>
        `;

        result = result.replace(original, wrapped);
    }

    return result;
}

function decodeHTMLEntities(text: string): string {
    return text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}