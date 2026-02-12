
export async function highlightCodeBlocks(html: string): Promise<string> {

    const regex = /<pre><code class="language-([\w-+]+)">([\s\S]*?)<\/code><\/pre>/g;
    const matches = [...html.matchAll(regex)];

    let result = html;

    for (const match of matches) {
        const [original, lang, rawCode] = match;
        const wrapped = `<pre class="editor-code" data-language="${lang}"><code>${rawCode}</code></pre>`;
        result = result.replace(original, wrapped);
    }

    return result;
}