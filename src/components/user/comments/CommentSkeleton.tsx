import styled from 'styled-components';

export const CommentSkeleton = () => {
    return (
        <SkeletonWrapper>
            {[...Array(3)].map((_, idx) => (
                <CommentItem key={idx}>
                    <CommentHeader>
                        <CommentAuthorSkeleton />
                        <CommentDateSkeleton />
                    </CommentHeader>

                    <CommentContent>
                        <SkeletonLine width="100%" />
                        <SkeletonLine width="85%" />
                        <SkeletonLine width="60%" />
                    </CommentContent>

                    <CommentFooter>
                        <ReplyButtonSkeleton width="80px" />
                        <ButtonGroup>
                            <SmallButtonSkeleton width="60px" />
                            <SmallButtonSkeleton width="60px" />
                        </ButtonGroup>
                    </CommentFooter>
                </CommentItem>
            ))}
        </SkeletonWrapper>
    );
};

const pulse = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.4; }
        100% { opacity: 1; }
    }
`;

const SkeletonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 0;
`;

const CommentItem = styled.div`
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CommentAuthorSkeleton = styled.div`
    width: 80px;
    height: 14px;
    background-color: #ddd;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
    ${pulse}
`;

const CommentDateSkeleton = styled.div`
    width: 60px;
    height: 12px;
    background-color: #ddd;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const SkeletonLine = styled.div<{ width: string }>`
    height: 12px;
    background-color: #eee;
    border-radius: 4px;
    width: ${({ width }) => width};
    animation: pulse 1.5s infinite ease-in-out;
`;

const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
`;

const ReplyButtonSkeleton = styled(SkeletonLine)`
    height: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const SmallButtonSkeleton = styled(SkeletonLine)`
    height: 10px;
`;