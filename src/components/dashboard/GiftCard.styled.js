import styled from "styled-components";

export const GiftCardSection = styled.section`
    padding: 2rem 2rem;
    background: #fff;
`

export const GiftCardContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between
    gap: 4rem;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`
export const GiftCardText = styled.div`
    flex: 1

    h2 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #222
    }
`

export const GiftCardImage = styled.img`
    flex: 1;
    width: 100%;
    max-width: 500px;
    border-radius: 1rem;
    margin-left: 14rem;
`

export const GiftCardButton = styled.button`
    background: black;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`