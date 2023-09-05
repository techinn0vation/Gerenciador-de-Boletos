import React from 'react'
import { ViewTabelaValores, WrapperTabelaValores } from './styles'
import Headline from '../Headline'

import {
  WrapperTable,
  TableRow,
  TableData
} from '../StylesPages/StylesUsuarios'

import { GiTakeMyMoney } from 'react-icons/gi'

export default function TabelaValores() {
  return (
    <ViewTabelaValores>
      <WrapperTabelaValores>
        <Headline title="valores para acordo" text="" />
        <WrapperTable>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              200-499
            </TableData>
            <TableData />
            <TableData>99,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              500-700
            </TableData>
            <TableData />
            <TableData>199,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              700-1.000
            </TableData>
            <TableData />
            <TableData>299,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              1.000-1.500
            </TableData>
            <TableData />
            <TableData>399,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              1.500-2.000
            </TableData>
            <TableData />
            <TableData>499,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              2.000-2.500
            </TableData>
            <TableData />
            <TableData>599,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              2.500-3.000
            </TableData>
            <TableData />
            <TableData>699,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              3.000-3.500
            </TableData>
            <TableData />
            <TableData>799,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              3.500-5.000
            </TableData>
            <TableData />
            <TableData>919,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              5.000-7.500
            </TableData>
            <TableData />
            <TableData>919,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              7.500-10.000
            </TableData>
            <TableData />
            <TableData>1.504,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              10.000-15.000
            </TableData>
            <TableData />
            <TableData>2.919,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              15.000-18.000
            </TableData>
            <TableData />
            <TableData>3.919,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              18.000-25.000
            </TableData>
            <TableData />
            <TableData>4.509,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              25.000-30.000
            </TableData>
            <TableData />
            <TableData>5.519,00</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              acima de 30.000
            </TableData>
            <TableData />
            <TableData>5.519,00</TableData>
          </TableRow>
        </WrapperTable>
      </WrapperTabelaValores>
    </ViewTabelaValores>
  )
}
