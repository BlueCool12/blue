import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useThemeMode } from "../../../contexts/ThemeContext";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { loadPostDetail } from "../../../store/user/postSlice";

import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { EmptyState } from "../../../components/user/EmptyState";
import Error from "../Error";

import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';

import styled from "styled-components";

const PostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { postDetail, loading, error } = useAppSelector((state: any) => state.userPost);
    const { themeMode } = useThemeMode();

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
    }, [postDetail, themeMode]);

    if (loading) return <LoadingSpinner />

    if (error) return <Error message={error} />

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
    padding: 1.5rem 1rem;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

const Header = styled.header`
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};
    padding: 1rem 0;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Category = styled.span`
    background: ${({ theme }) => theme.themeColor9};
    color: ${({ theme }) => theme.themeColor1};
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
    font-size: 1rem;
    padding: 1rem 0.5rem;
    line-height: 1.7 !important;            

    ul, ol {
        padding-left: 2.5rem;
        margin: 0;
    }

    li {
        margin: 0;        
        line-height: inherit;
    }

    p {
        margin: 0;
        line-height: inherit;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 1rem 0;
    }

    img {
        border-radius: 0.5rem;
    }

    pre code.hljs {        
        padding: 1rem;
        border-radius: 0.5rem;
        font-family: 'Fira Code', monospace;
        font-size: 1rem;        
    }
    
`;

export default PostDetail;