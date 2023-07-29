import bwipjs from 'bwip-js'

export default async function handler(req: any, res: any) {
  const { value } = req.query
  try {
    const png = await bwipjs.toBuffer({
      bcid: 'code128', // Código de barras ITF-14 (Intercalado 2 de 5)
      text: value,
      scale: 3,
      height: 8,
      includetext: true
    })

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': png.length
    })
    res.end(png)
  } catch (error) {
    console.error('Erro ao gerar código de barras:', error)
    res.status(500).json({ error: 'Erro ao gerar código de barras' })
  }
}
