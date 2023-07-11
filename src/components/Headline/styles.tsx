import styled from 'styled-components'

export const WrapperHeadline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: initial;
  align-items: initial;
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
`
