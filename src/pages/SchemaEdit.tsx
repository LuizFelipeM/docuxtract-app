import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { FieldEditor } from '../components/FieldEditor'
import { ServicesContext } from '../contexts/ServiceContext'
import { FieldType } from '../types/FieldType'
import { SchemaDto } from '../types/SchemaDto'

export const SchemaEdit: React.FC = () => {
  let { id } = useParams()

  if (!id)
    toast.error("Não é possível encontrar o modelo solicitado para edição!")

  const { schemasService } = useContext(ServicesContext)

  const { data, isLoading } = useQuery({
    queryKey: ["schema", id, "query"],
    retry: false,
    enabled: !!id,
    queryFn: async () => {
      return await schemasService.get(id!)
    },
  })

  const { mutate } = useMutation({
    mutationKey: ["schema", id, "mutation"],
    mutationFn: async (schema: SchemaDto) => {
      await schemasService.save(schema)
      toast.success("Modelo salvo com sucesso!")
    },
    onError: (error) => {
      toast.error("Erro ao salvar modelo! Por favor, entre em contato com o time de suporte.")
      console.error(error)
    }
  })

  return (
    <>
      <FieldEditor
        name={data?.name}
        fields={data?.json_schema?.properties}
        isLoading={isLoading}
        onSave={(name, properties) => {
          mutate({
            id: data?.id,
            name,
            json_schema: {
              name,
              description: `Modelo ${name} a ser extraído`,
              required: true,
              type: FieldType.object,
              properties
            }
          })
          return
        }}
      />
    </>
  )
}
