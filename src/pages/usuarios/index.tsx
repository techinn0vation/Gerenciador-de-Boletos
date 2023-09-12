/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Layout, SideBar, Modal, Headline } from '@/components/GeralComponents'
import { useState, useEffect } from 'react'
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
import { api } from '@/services/api'

interface IUsers {
  id: string;
  nome: string;
  email: string;
  usuario: string;
  tipo: string;
  bloqueado: string;
  nivel: string;
  final: string;
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
  const [rows, setRows] = useState<IUsers[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [Auth, setAuth] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token')
      setAuth(token != null ? `Bearer ${token}` : '')
    }
  }, [])

  useEffect(() => {
    async function handleUsers() {
      try {
        const response = await api.get('/users', {
          headers: { Authorization: Auth }
        })
        const users = response.data.map((item: IUsers) =>
          createData(
            item.id,
            item.nome,
            item.email,
            item.usuario,
            item.tipo,
            item.bloqueado,
            item.id
          )
        )
        setRows(users)
      } catch (error) {
        console.log(error)
      }
    }

    void handleUsers()
  }, [])

  async function handleDelete(id: number) {
    try {
      await api.delete(`/user/${id}`, {
        headers: { Authorization: Auth }
      })
      alert('Usuário deletado com sucesso!')
      location.assign('/usuarios')
    } catch (error) {
      alert('Ocorreu um erro! Tente novamente.')
    }
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
          {rows.length > 0 && (
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
                <TableRow key={row.id}>
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
                    <ButtonDelete
                      onClick={async () => {
                        await handleDelete(Number(row.id))
                      }}
                    />
                  </TableData>
                </TableRow>
              ))}
            </WrapperTable>
          )}
        </ContentUsuarios>
      </WrapperUsuarios>
    </Layout>
  )
}
