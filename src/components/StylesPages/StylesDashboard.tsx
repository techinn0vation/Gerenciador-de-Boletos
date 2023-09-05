import styled from 'styled-components'
import Image from 'next/image'

export const WrapperDashboard = styled.section`
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
export const ContentDashboard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;
    padding: 1.6rem;
    /* height: 55rem; */ //OBS
  }
`
export const HeadlineDashboard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;

  /* Component DisplayTitle */
  h1 {
    color: ${props => props.theme.colors.colorC};
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 3rem;
    text-transform: uppercase;
  }

  /* Component DisplayTypography */
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: ${props => props.theme.colors.colorC};
    &::first-letter {
      text-transform: capitalize;
    }
  }

  /* Configuração de Media MD (Medium)*/
  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    h1 {
      font-size: 2.3rem;
      line-height: 3.45rem;
    }
  }

  /* Configuração de Media LG (Large)*/
  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    h1 {
      font-size: 2.5rem;
      line-height: 3.7rem;
    }
  }
`
export const CardsDashboard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    grid-template-columns: repeat(2, 1fr);
  }
`
export const DisplayCard = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: 1.6rem;
  border: none;
  box-shadow: 0 0 0.6rem 0 ${props => props.theme.colors.colorH};
  position: relative;

  /* Component DisplayTitle */
  h1 {
    color: ${props => props.theme.colors.colorA};
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    text-transform: uppercase;
    text-align: center;
    z-index: 9;
  }

  /* Component DisplayTypography */
  p {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    text-align: center;
    color: ${props => props.theme.colors.colorA};
    text-transform: uppercase;
    z-index: 9;
  }
`
export const FrameCard = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 1.6rem;
  position: absolute;
`
