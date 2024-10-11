import React, { useContext, useEffect, useState } from 'react'
import { FieldEditor } from '../components/FieldEditor'
import { FieldType } from '../types/FieldType'
import { SchemaDto } from '../types/SchemaDto'
import { ServicesContext } from '../contexts/ServiceContext'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export const Schema: React.FC = () => {
  let { id } = useParams()

  const { schemasService } = useContext(ServicesContext)
  const [schema, setSchema] = useState<Partial<SchemaDto>>({})

  useEffect(() => {
    if (id)
      schemasService.getSchema(id)
        .then(setSchema)
        .catch(() => toast.error("Não foi possível carregar o modelo que está tentando editar, por favor, tente novamente ou entre em contato."))
  }, [id])

  const saveSchema = async (schema: SchemaDto) => {
    try {
      await schemasService.saveSchema(schema)
      toast.success('Modelo salvo com sucesso!')
      return true
    } catch (error) {
      toast.error('Erro ao salvar modelo!')
      console.error(error)
      return false
    }
  }

  return (
    <>
      <FieldEditor
        fields={schema.json_schema?.properties}
        onSave={async (name, properties) =>
          await saveSchema({
            id: schema.id,
            name,
            json_schema: {
              name,
              description: `Modelo ${name} a ser extraído`,
              required: true,
              type: FieldType.object,
              properties
            }
          })
        }
      />
    </>
  )
}
