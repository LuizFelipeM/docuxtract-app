import React from 'react'
import { PageLayout } from '../components/PageLayout'

export const Home: React.FC = () => {
  return (
    <PageLayout>
      <h2 className="text-2xl font-bold">Bem vindo ao Docuxtract</h2>
      <p>Acesse a aba <b>Criar novo modelo</b> para começar a criar seus modelos e extrair os dados mais valiosos para o seu negócio!</p>
    </PageLayout>
  )
}
