'use client';

import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import styled from "styled-components";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { RootState } from "@/store/store";
import { loadPostDetail } from "@/store/user/postSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { EmptyState } from "@/components/user/EmptyState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";



const PostDetail = () => {

    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { postDetail, loading, error } = useAppSelector((state: RootState) => state.userPost);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (slug) {
            dispatch(loadPostDetail(slug));
        }
    }, [dispatch, slug]);

    useEffect(() => {
        if (!contentRef.current || !postDetail?.content) return;

        const raf = requestAnimationFrame(() => {
            const blocks = contentRef.current!.querySelectorAll("pre code");
            blocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);

                const parentPre = block.closest("pre");
                if (!parentPre) return;

                const wrapper = document.createElement("div");
                wrapper.style.position = "relative";

                parentPre.parentNode?.replaceChild(wrapper, parentPre);
                wrapper.appendChild(parentPre);

                const classList = block.className.split(" ");
                const langClass = classList.find((cls) => cls.startsWith("language-"));
                const lang = langClass?.replace("language-", "").toUpperCase();

                if (lang) {
                    const label = document.createElement("div");
                    label.textContent = lang;
                    label.style.cssText = `
                        position: absolute;         
                        top: 8px;
                        right: 12px;
                        font-size: 0.75rem;
                        font-weight: 600;
                        background: rgba(0, 0, 0, 0.6);
                        color: #fff;
                        padding: 2px 8px;
                        border-radius: 6px;
                        font-family: 'Noto Sans KR', sans-serif;
                        letter-spacing: 0.5px;
                        pointer-events: none;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    `;
                    wrapper.appendChild(label);
                }
            });
        });

        return () => cancelAnimationFrame(raf);
    }, [postDetail]);

    if (loading) return <LoadingSpinner />
    if (error) throw error;
    if (!postDetail) return <EmptyState message="작성한 글이 없습니다..." />    

    return (
        <Article>
            <Header>
                <Meta>
                    <Date dateTime={postDetail.createdAt}>{postDetail.createdAt}</Date>
                    <Category>{postDetail.category}</Category>
                </Meta>

                <Title>{postDetail.title}</Title>
            </Header>

            <Content ref={contentRef} dangerouslySetInnerHTML={{ __html: postDetail.content }} />
        </Article>
    );
}

const Article = styled.article`
    padding: 3rem 1rem;
    margin-bottom: 3rem;

    border-bottom: 2px solid var(--border-color);
    
    @media (max-width: 768px) {
        padding: 2rem 0.5rem;
        margin-bottom: 2rem;
    }
`;

const Header = styled.header`
    border-bottom: 2px solid var(--border-color);
    padding: 0 0 1rem;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Category = styled.span`
    background: var(--theme-color-9);
    color: var(--theme-color-1);
    padding: 0.3rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

const Date = styled.time`
    font-size: 1rem;
    opacity: 0.8;
`;

const Title = styled.h1`
    font-size: 2rem;
    padding: 1.5rem 0;
`;

const Content = styled.div`

    /* CKEditor 설정 */

    /* 전체 폰트 및 텍스트 */
    padding: 1rem 0.1rem;
    line-height: 1.6;
    word-break: break-word;

    /* 제목 요소 */
    h1, h2, h3, h4, h5, h6 {
        margin: 1.5rem 0 1rem;
        font-weight: bold;
    }
    
    /* 스타일 -> Marker (노란 배경) */
    span.marker {
        background: yellow;
    }

    /* 스타일 -> Spoiler (hover 시 보이게 됨) */
    span.spoiler {
        background: #000;
        color: #000;
        transition: color 0.3s ease;
    }

    span.spoiler:hover {
        color: #fff;
    }

    /* 이미지 */
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1rem auto;
        border-radius: 0.5rem;
    }

    /* 목록 */
    ul, ol {
        padding-left: 2rem;
        margin: 1rem 0;
    }

    li {
        margin-bottom: 0.5rem;
    }

    /* 인용구 */
    blockquote {
        border-left: 5px solid var(--border-color);
        background-color: var(--card-bg);
        padding: 0.75rem 1.25rem;
        margin: 1.5rem 0;
        font-style: italic;    
        
        p {
            margin: 0.5rem 0;
        }
    }

    /* 링크 */
    a {
        text-decoration: underline;

        &:hover {
            color: var(--link-hover-color);            
        }
    }

    /* 구분선 */
    hr {
        border: none;
        border-top: 1px solid var(--border-color);
        margin: 2rem 0;
    }

    /* 이미지 캡션 및 figure */
    figure {
        margin: 2rem 0;
        text-align: center;
    }

    figcaption {
        font-size: 0.9rem;
        opacity: 0.7;
        margin-top: 0.5rem;
    }

    /* 코드 블록 */
    code {
        border-radius: 0.5rem;
        font-size: 1rem;
    }    

`;

export default PostDetail;