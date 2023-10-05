/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value } = req.query
  try {
    const dados = await fetch(
      `http://24.152.38.106/caixa_plus?token=EcrVtBytvFTR6CTv7y&tipo=cpf&dados=${value}`
    )

    const response = await dados.json()

    res.status(200).json(response)
  } catch (error) {
    console.error('Erro ao buscar cpf:', error)
    res.status(500).json({ error: 'Erro ao buscar cpf' })
  }
}
