/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useRef, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Svg } from '@react-pdf/renderer'
import ImageSanepar from '../../../../public/img/logo-sanepar-br.png'

import QRCode from 'qrcode'
import { api } from '@/services/api';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 10,
    fontSize: 10
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  header2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20
  },
  containerText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 5
  },
  containerTextRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  containerTextRowRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  textBlack: {
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    maxWidth: '45%',
    padding: '10px 0',
  },
  body: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center'
  },
  imgCodigoBarras: {
    width: '30%',
    backgroundSize: 'contain',
    margin: '0px auto'
  },
  via: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20
  }
})

export interface IAguaProps {
  id?: number
  // eslint-disable-next-line prettier/prettier
  nomeCliente?: string
  endereco?: string
  dataVencimento?: string
  codigoCliente?: string
  referencia?: string
  valor: string
  matricula?: string
  nomeAvalistaPix: string
  cidade?: string
  pix?: string,
  txid?: string
}

export function Agua({
  nomeCliente,
  endereco,
  dataVencimento,
  codigoCliente,
  referencia,
  valor,
  matricula,
  nomeAvalistaPix,
  cidade,
  pix,
  txid
}: IAguaProps) {

  const [imgB002Url, setImgB002Url] = useState('');
  const [barcodeImage, setBarcodeImage] = useState<string>('');
  const [copiaCola, setCopiaCola] = useState<string | null>(null)
  const [data, setData] = useState('')

  // Função para converter a imagem em URL de dados (data URL)
  const convertImageToDataUrl = async (imagePath: RequestInfo | URL) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  async function getPixCopCol() {
    const valorCerto = valor.length === 6 ? valor.replace(',', '.') : valor.replace('.', '').replace(',', '.')

    const result = await api.post('/generate-pix-qrcode', {
      nomeCliente: nomeAvalistaPix,
      cidade,
      pix,
      valorAPagar: valorCerto,
      txid
    })

    const qrcode = result.data.qrCodeUrl

    setCopiaCola(qrcode)
  }

  useEffect(() => {
    void getPixCopCol()
  }, [])


  useEffect(() => {
    // Carregar as imagens ao montar o componente
    convertImageToDataUrl('/img/IMG_B005.png')
      .then((url) => { setImgB002Url(url); })
      .catch((error) => { console.log(error); });
  }, []);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image style={styles.img} src={imgB002Url} />
          </View>
          <View>
            <Text style={styles.bold}>Segunda via simplificada</Text>
          </View>
          <View style={styles.via}>
            <Text>Via do cliente</Text>
          </View>
        </View>
        <View style={styles.containerText}>
          <View style={styles.containerTextRow}>
            <Text>Matricula:</Text>
            <Text style={styles.textBlack}>{matricula}</Text>
          </View>

          <View style={styles.containerTextRow}>
            <Text>Nome:</Text>
            <Text style={styles.textBlack}>{nomeCliente}</Text>
          </View>

          <View style={styles.containerTextRow}>
            <Text>Endereço:</Text>
            <Text style={styles.textBlack}>{endereco}</Text>
          </View>

          <View style={styles.containerTextRowRight}>
            <Text>Número:</Text>
            <Text style={styles.textBlack}>{matricula}</Text>
          </View>

          <View style={styles.containerTextRow}>
            <Text>Data de Vencimento:</Text>
            <Text style={styles.textBlack}>{dataVencimento}</Text>
          </View>

          <View style={styles.containerTextRow}>
            <Text>Valor:</Text>
            <Text style={styles.textBlack}>R$ {valor}</Text>
          </View>
        </View>

        <Image style={styles.imgCodigoBarras} src={copiaCola !== null ? copiaCola : ''} />
      </Page>

    </Document>
  );
}