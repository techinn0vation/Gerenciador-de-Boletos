/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value } = req.query
  // try {
  const dados = await fetch(
    `https://api.searchlock.me/caixa_plus?token=bt877bqwfncqe88&tipo=cpf&dados=${value}`
  )

  const dados2 = await fetch(
    `https://api.searchlock.me/caixa_plus_v2?token=bt877bqwfncqe88&tipo=cpf&dados=${value}`
  )

  const response = await dados.json()
  const response2 = await dados2.json()

  console.log(dados)
  console.log(dados2)
  console.log(response)
  console.log(response2)
  // } catch (error) {
  //   console.error('Erro ao buscar cpf:', error)
  //   res.status(500).json({ error: 'Erro ao buscar cpf', erro: error })
  // }
}
