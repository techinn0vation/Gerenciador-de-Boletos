/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Layout, SideBar, Modal, Headline } from '@/components/GeralComponents'

import { useState } from 'react'

import {
  WrapperUsuarios,
  ContentUsuarios,
  ButtonAdd,
  WrapperTable,
  TableRow,
  TableHeader,
  TableData,
  ButtonDelete
} from '..//..//components/StylesPages/StylesUsuarios'

import React from 'react'
import { api } from '@/services/api'

interface IUsers {
  id: string
  nome: string
  email: string
  usuario: string
  tipo: string
  bloqueado: string
  nivel: string
  final: string
}

function createData(
  id: string,
  nome: string,
  email: string,
  usuario: string,
  tipo: string,
  bloqueado: string,
  nivel: string
) {
  return { id, nome, email, usuario, tipo, bloqueado, nivel }
}

export default function Usuarios() {
  const [openModal, setOpenModal] = useState(false)

  function handleOpenModal() {
    setOpenModal(!openModal)
  }

  function handleCloseModal() {
    setOpenModal(false)
  }
  // ==================================
  const [rows, setRows] = React.useState<IUsers[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const token = localStorage.getItem('token')
  const Auth = `Bearer ${token}`

  React.useEffect(() => {
    async function handleUsers() {
      await api
        .get('/users', { headers: { Authorization: Auth } })
        .then(result => {
          setRows(
            result.data.map((item: IUsers) =>
              createData(
                `${item.final}`,
                `${item.nome}`,
                `${item.email}`,
                `${item.usuario}`,
                `${item.tipo}`,
                `${item.bloqueado}`,
                `${item.id}`
              )
            )
          )
        })
    }

    void handleUsers()
  }, [Auth])

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }

  async function handleDelete(id: number) {
    await api
      .delete(`/user/${id}`, { headers: { Authorization: Auth } })
      .then(() => {
        alert('Usuário deletado com sucesso!')
        location.assign('/users');
      })
      .catch(() => {
        alert('Ocorreu um erro! Tente novamente.')
      })
  }

  return (
    <Layout>
      <WrapperUsuarios>
        <SideBar />
        <ContentUsuarios>
          <Headline
            title="tabela de usuários"
            text="gerenciamento de usuários"
          />
          <ButtonAdd onClick={handleOpenModal} />
          {openModal && <Modal onClose={handleCloseModal} />}
          <WrapperTable>

            <TableRow>
              <TableHeader>id</TableHeader>
              <TableHeader>nome</TableHeader>
              <TableHeader>e-mail</TableHeader>
              <TableHeader>usuario</TableHeader>
              <TableHeader>tipo</TableHeader>
              <TableHeader>bloqueado</TableHeader>
              <TableHeader>nível</TableHeader>
              <TableHeader>ação</TableHeader>
            </TableRow>
          {rows.map(row => (
            <>
            <TableRow>
              <TableData>{row.id}</TableData>
              <TableData>{row.nome}</TableData>
              <TableData>{row.email}</TableData>
              <TableData>{row.usuario}</TableData>
              {row.tipo === 'A' ? (
              <TableData>administrador</TableData>
              ) : row.tipo === 'U' ? (
              <TableData>usuário</TableData>
              ) : (
              <TableData>operador</TableData>
              )}
              <TableData>{row.bloqueado}</TableData>
              <TableData>{row.nivel}</TableData>
              <TableData>
                <ButtonDelete onClick={async () => { await handleDelete(Number(row.id)); }} />
              </TableData>
            </TableRow>
            </>
          ))}
          </WrapperTable>
        </ContentUsuarios>
      </WrapperUsuarios>
    </Layout>
  )
}
