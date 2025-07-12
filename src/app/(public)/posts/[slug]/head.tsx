import { postService } from "@/services/user/postService";

interface Props {
    params: { slug: string };
}

export default async function Head({ params }: Props) {
    const slug = decodeURIComponent(params.slug);
    const post = await postService.getPostBySlug(slug);

    if (!post) return null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.summary || post.title,
        "author": {
            "@type": "Person",
            "name": "BlueCool12"
        },
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt,
        "url": `https://pyomin.com/posts/${slug}`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://pyomin.com/posts/${slug}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "BlueCool12 Blog",            
        },
        "articleSection": post.category,        
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
        </script>
    );
}