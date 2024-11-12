/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { useEffect, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
// import { Pix } from '@/components/Gerar_Pix/Reac_Pix'
// import moment from 'moment'
// import { PixNovo } from '@/components/Gerar_Pix/Reac_Pix_Novo'
import { Termos } from '@/components/Gerar_Termos/Reac_Termo'

export default function Boleto() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {isClient && (
        <PDFViewer style={{ display: 'flex' }} width={'100%'} height={'100%'}>
          {/* <PixNovo
            cidade={'São Paulo'}
            nomeCliente={'Testando Silva'}
            codigoCliente={Math.floor(Date.now() * Math.random()).toString()}
            valor={'25.50'}
            nomeAvalistaPix={'nomeAvalista'}
            dataVencimento={'12/11/2024'}
            pix={'chavePix'}
            cpfCnpj={'100.100.100-00'}
            descricao={'descricao'}
            txid={'txid'}
          /> */}
          <Termos nomeAvalistaPix="Testando aqui" />
        </PDFViewer>
      )}
    </div>
  )
}
