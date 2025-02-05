import styled from "styled-components";

export const ExperienceColumns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
`

export const ExperienceColumn = styled.div`
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    min-height: 400px;
`

export const ExperienceImage = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease;
`

export const ExperienceContent = styled.div`
    position: relative;
    padding: 2rem;
    color: white;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, transparent 10 0%)
`

export const ExperienceButton = styled.button`
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    align-self: flex-start;
    transition: all 0.3s ease;

    &:hover {
        background: #FF5A5F;
        border-color: #FF5A5F;
    }
`