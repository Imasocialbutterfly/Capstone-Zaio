import styled from "styled-components";

export const HostingSection = styled.section`
    position: relative;
    padding: 6rem 2rem;
    background-size: cover;
    background-position: center;
    color: white;
`

export const HostingContent = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const HostingText = styled.div`
    max-width: 600px;

    h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }
`

export const HostingButton = styled.button`
    background: black;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    width: fit-content;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
`