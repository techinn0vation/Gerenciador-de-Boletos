import styled from 'styled-components'

export const WrapperRedirecionador = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    flex-direction: row;
    align-items: flex-start;
    padding: 1rem;
  }
`
export const ContentRedirecionador = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.6rem 0;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;
    padding: 1.6rem;
  }
`
export const ButtonGeradorLinks = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.9rem;
  border: solid ${props => props.theme.colors.colorH} 0.1rem;
  box-shadow: 0 0 0.8rem 0 ${props => props.theme.colors.colorH};
  background: ${props => props.theme.colors.colorH};
  padding: 0.8rem;
  position: relative;

  /* Component DisplayTypography */
  p,
  svg {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    white-space: nowrap;
    color: ${props => props.theme.colors.colorC};
    &::first-letter {
      text-transform: capitalize;
    }
    text-align: center;
  }
  transition: ease-in 0.03s;
  &:active {
    transform: translateY(0.2rem);
  }

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    max-width: 16rem;
    border: solid red 2px;
    border-radius: 0;
    border: none;
    box-shadow: none;
    justify-content: flex-start;
    align-items: flex-start;
    background: none;

    &:hover::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 2px;
      background: ${props => props.theme.colors.colorH};
      animation: underline 0.3s ease-out forwards;
    }

    @keyframes underline {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
  }
`
export const ContentLinksGerados = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  overflow: scroll;
  transition: transform 0.2s ease-in-out;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 100%;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`
