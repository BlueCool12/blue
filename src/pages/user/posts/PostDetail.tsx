import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadPostDetail } from "../../../store/user/postSlice";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import styled from "styled-components";



const PostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { postDetail, loading, error } = useAppSelector((state: any) => state.userPost);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (slug) {
            dispatch(loadPostDetail(slug));
        }
    }, [dispatch, slug]);

    useEffect(() => {
        if (contentRef.current && postDetail?.content) {
            contentRef.current
                .querySelectorAll("pre code")
                .forEach((block) => {
                    block.removeAttribute("data-highlighted");
                    block.innerHTML = block.textContent ?? "";
                    hljs.highlightElement(block as HTMLElement);
                });
        }
    }, [postDetail?.content]);

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>에러 발생</div>
    }

    if (!postDetail) {
        return <div>게시글 없음</div>
    }

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

    pre {
        overflow-x: auto;        
    }    

    code {
        font-family: 'Fira Code', monospace;
        border-radius: 0.5rem;
        line-height: inherit;
    }

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
    
`;

export default PostDetail;