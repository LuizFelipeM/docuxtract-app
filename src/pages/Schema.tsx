import React, { useContext } from 'react'
import { FieldEditor } from '../components/FieldEditor'
import { FieldType } from '../types/FieldType'
import { SchemaDto } from '../types/SchemaDto'
import { ServicesContext } from '../contexts/ServiceContext'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

export const Schema: React.FC = () => {
  const { schemasService } = useContext(ServicesContext)

  const { mutate, isPending } = useMutation({
    mutationKey: ["newSchemaMutation"],
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
        isLoading={isPending}
        onSave={(name, properties) => {
          mutate({
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
