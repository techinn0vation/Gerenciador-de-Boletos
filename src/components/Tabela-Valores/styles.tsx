import styled from 'styled-components'

export const WrapperTabelaValores = styled.section`
  width: 100%;
  background: ${props => props.theme.colors.colorA};
  box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
  border-radius: 1.6rem;
  padding: 1.6rem;

  table {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    box-shadow: none;
    gap: 2rem;

    tr {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 0.03rem;
          background-color: ${props => props.theme.colors.colorH};
          border-radius: 1rem;
          margin-top: 1rem;
        }
      }

      td {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        svg {
          font-size: 2rem;
          color: ${props => props.theme.colors.colorH};
        }
      }
    }

    @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      box-shadow: none;
      /* gap: 0 3rem; */
    }
  }
`
export const ViewTabelaValores = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 1rem;
`
