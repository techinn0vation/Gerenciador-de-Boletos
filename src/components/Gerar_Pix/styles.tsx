import styled from 'styled-components'

export const WrapperGerarPix = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  /* @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    flex-direction: row;
    align-items: flex-start;
  } */
`
export const ContentGerarPix = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    div {
      max-width: 40rem; // OBS!
    }
  }
`
