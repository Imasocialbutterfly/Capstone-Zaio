import styled from "styled-components";

export const FooterContainer = styled.div`
    background-color: #f7f7f7;
    padding: 40px 20px;
`

export const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    max-width: 1200px;
    margin: auto;
`

export const FooterColumn = styled.div`
    display: flex;
    flex-direction: column;
`

export const FooterHeading = styled.h4`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;
`

export const FooterLink = styled.a`
    font-size: 14px;
    color: #555;
    text-decoration: none;
    margin-bottom: 10px;
    transition: color 0.3s ease;

    &:hover {
        color: #ff385c;
    }
`