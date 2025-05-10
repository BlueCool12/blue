import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loadPosts } from "../../../store/user/postSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";


const PostList = () => {

    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector((state: any) => state.userPost);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>에러 발생</div>
    }

    return (
        <PostListSection>
            <PostListWrapper>
                {posts.map((post: any) => (
                    <ListItem key={post.slug}>
                        <Post>
                            <Link to={`/posts/${post.slug}`}>
                                <TitleWrapper>
                                    <Title>{post.title}</Title>
                                    <Category>{post.category}</Category>
                                </TitleWrapper>

                                <Content>{post.contentSummary}</Content>

                                <Meta>
                                    <time dateTime={post.createdAt}>{post.createdAt}</time>
                                </Meta>
                            </Link>
                        </Post>
                    </ListItem>
                ))}
            </PostListWrapper>
        </PostListSection>
    );
};

export default PostList;

const PostListSection = styled.section`
    padding: 1rem;    
`;

const PostListWrapper = styled.ul`
    width: 100%;    
`;

const ListItem = styled.li`
    list-style: none;    
    display: flex;
    flex-direction: column;            
    padding: 0 1rem;

    @media (max-width: 768px) {
        padding: 0;
    }
`;

const Post = styled.article`
    padding: 1.2rem 0 0.8rem;    
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};

    &:hover {
        border-bottom: 2px solid ${({ theme }) => theme.themeColor9};
    }

    a {
        display: block;
        text-decoration: none;
        color: inherit;
    }
`;

const TitleWrapper = styled.header`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Title = styled.h2`
    flex: 1;
    font-size: 1.1rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Category = styled.span`    
    display: inline-block;
    background-color: ${({ theme }) => theme.themeColor9};
    color: ${({ theme }) => theme.themeColor1};
    border-radius: 9999px;
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
`;

const Content = styled.p`
    margin: 0.5rem 0;
    font-size: 0.9rem;
    line-height: 1.5;
    opacity: 0.8;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Meta = styled.footer`
    display: flex;        
    justify-content: end;    
    font-size: 0.8rem;
    opacity: 0.6;
`;