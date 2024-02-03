/* eslint-disable @typescript-eslint/restrict-template-expressions */

import axios from 'axios'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value } = req.query
  try {
    const dados = await axios.get(
      `http://24.152.38.106/caixa_plus?token=6Df6G8Hj9j94d&tipo=cpf&dados=${value}`
    )
    console.log(dados)
    // https://api.searchlock.me/caixa_plus_v2?token=bt877bqwfncqe88&tipo=cpf&dados=16814417723
    const response = await dados.data

    res.status(200).send(response)
  } catch (error) {
    console.error('Erro ao buscar cpf:', error)
    res.status(500).json({ error: 'Erro ao buscar cpf' })
  }
}
