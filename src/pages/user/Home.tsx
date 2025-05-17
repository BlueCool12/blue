import styled from 'styled-components';
import working from '../../assets/images/working.png';

const Home = () => {
    return (

        <Wrapper>
            <Image src={working} />

            <Title>🚧 메인페이지는 현재 작업중에 있습니다 🚧</Title>
        </Wrapper>

    )
}

const Wrapper = styled.main`
    display: flex;
    height: 75vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    @media (max-width: 768px) {
        gap: 1.5rem;
    }
`;

const Image = styled.img`
    border-radius: 100%;
    max-height: 30rem;
    max-width: 30rem;
    aspect-ratio: 1/1;
    object-fit: cover;

    @media (max-width: 768px) {
        max-width: 15rem;
        max-height: 15rem;
    }
`;

const Title = styled.h1`
    font-size: 1.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export default Home;