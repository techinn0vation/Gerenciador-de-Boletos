/* eslint-disable @typescript-eslint/restrict-template-expressions */

import axios from 'axios'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cpfCnpj } = req.query
  console.log(cpfCnpj)
  try {
    const dados = await axios.get(
      `https://databrazil.org/APIs/Serasa.php?cpf=${cpfCnpj}`
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
