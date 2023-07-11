import styled from 'styled-components'

export const WrapperScroll = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 0.5rem;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.colorH} 25%,
    ${props => props.theme.colors.colorC} 50%,
    ${props => props.theme.colors.colorH} 100%
  );
  transition: width 0.2s ease-in-out;
  z-index: 3;
`
