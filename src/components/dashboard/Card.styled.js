import styled from 'styled-components'

export const CardContainer = styled.div`
    position: relative;
    border-radius: 0.75rem;
    overflow: hidden;
    width: 16rem;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`

export const ImageContainer = styled.div`
    height: 20rem;
    width: 100%;
`

export const CardImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

export const TextOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4));
    padding: 1.5rem 1rem;
    color: white;
`

export const CityName = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
`

export const CountryName = styled.p`
    color: rgba(255, 255, 255, 0.9)
    font-size: 0.875rem
`