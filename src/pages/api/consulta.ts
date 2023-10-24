/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value } = req.query
  try {
    const dados = await fetch(
      `http://api.searchlock.me/caixa_plus?token=bt877bqwfncqe88&tipo=cpf&dados=${value}`
    )

    const response = await dados.json()

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cpf', erro: error })
  }
}
