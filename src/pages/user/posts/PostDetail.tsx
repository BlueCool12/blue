import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { loadPostDetail } from "../../../store/user/postSlice";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";


const PostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const { postDetail, loading, error } = useAppSelector((state: any) => state.userPost);

    useEffect(() => {
        if (slug) {
            dispatch(loadPostDetail(slug));
        }
    }, [dispatch, slug]);

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

            <Content dangerouslySetInnerHTML={{ __html: postDetail.content }} />
        </Article>
    );
}

const Article = styled.article`
      padding: 1.5rem 1rem;
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
    font-size: 0.9rem;
    font-weight: 700;
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
    padding: 1rem 0;
`;

export default PostDetail;