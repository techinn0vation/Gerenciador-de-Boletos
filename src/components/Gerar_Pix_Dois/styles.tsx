import styled from 'styled-components'

export const WrapperGerarPixDois = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`
export const ContentGerarPixDois = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 1rem;
  color: ${props => props.theme.colors.colorC};
`
export const ViewGerarPixDois = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    div {
      width: 100%;
      max-width: 90%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      place-items: center;
    }
  }
`
export const ViewDividas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ContentDividas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`
export const BlockDividas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 2.4rem;
    white-space: nowrap;
    &::first-letter {
      text-transform: capitalize;
    }
    color: ${props => props.theme.colors.colorC};
  }
`
