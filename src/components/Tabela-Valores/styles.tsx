import styled from 'styled-components'

export const WrapperTabelaValores = styled.section`
  width: 100%;
  padding: 1.6rem;

  table {
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
 */
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;

    tr {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      td:nth-child(2) {
        width: 75%;
        border-top: dashed 0.3rem ${props => props.theme.colors.colorH};
        padding: 0;
      }

      td {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem;

        svg {
          font-size: 2rem;
          color: ${props => props.theme.colors.colorH};
        }
      }
    }
  }
`
