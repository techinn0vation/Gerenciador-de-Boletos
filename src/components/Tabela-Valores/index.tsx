/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { ViewTabelaValores, WrapperTabelaValores } from './styles'
import Headline from '../Headline'

import {
  WrapperTable,
  TableRow,
  TableData
} from '../StylesPages/StylesUsuarios'

import { GiTakeMyMoney } from 'react-icons/gi'
import { api } from '@/services/api'

export default function TabelaValores() {
  const [final, setFinal] = useState('')
  const [Auth, setAuth] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token')
      setAuth(token != null ? `Bearer ${token}` : '')
    }
  }, [])

  useEffect(() => {
    async function getUser() {
      await api
        .get('/user', { headers: { Authorization: Auth } })
        .then(async result => {
          setFinal(result.data.final)
        })
    }
    getUser()
  }, [])

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
            <TableData>99,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              500-700
            </TableData>
            <TableData />
            <TableData>199,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              700-1.000
            </TableData>
            <TableData />
            <TableData>299,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              1.000-1.500
            </TableData>
            <TableData />
            <TableData>399,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              1.500-2.000
            </TableData>
            <TableData />
            <TableData>499,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              2.000-2.500
            </TableData>
            <TableData />
            <TableData>599,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              2.500-3.000
            </TableData>
            <TableData />
            <TableData>699,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              3.000-3.500
            </TableData>
            <TableData />
            <TableData>799,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              3.500-5.000
            </TableData>
            <TableData />
            <TableData>919,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              5.000-7.500
            </TableData>
            <TableData />
            <TableData>919,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              7.500-10.000
            </TableData>
            <TableData />
            <TableData>1.504,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              10.000-15.000
            </TableData>
            <TableData />
            <TableData>2.919,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              15.000-18.000
            </TableData>
            <TableData />
            <TableData>3.919,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              18.000-25.000
            </TableData>
            <TableData />
            <TableData>4.509,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              25.000-30.000
            </TableData>
            <TableData />
            <TableData>5.519,{final}</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableData>
              <GiTakeMyMoney />
              acima de 30.000
            </TableData>
            <TableData />
            <TableData>5.519,{final}</TableData>
          </TableRow>
        </WrapperTable>
      </WrapperTabelaValores>
    </ViewTabelaValores>
  )
}
