import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { FieldEditor } from '../components/FieldEditor'
import { FieldType } from '../types/FieldType'
import { Toast } from '../components/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { SchemaDto } from '../types/SchemaDto'
import { ServicesContext } from '../contexts/ServiceContext'
import { useParams } from 'react-router-dom'

export const Schema: React.FC = () => {
  let { id } = useParams()

  const { schemasService } = useContext(ServicesContext)
  const [toastInfo, setToastInfo] = useState<{ title: ReactNode, message: string }>()
  const [schema, setSchema] = useState<Partial<SchemaDto>>({})

  useEffect(() => {
    if (id)
      schemasService.getSchema(id)
        .then(setSchema)
        .catch(() => setToastInfo({
          title: (
            <>
              <FontAwesomeIcon icon={faTriangleExclamation} className='mr-2 text-red-500' />
              Não foi possível carregar o modelo!
            </>
          ),
          message: "Não foi possível carregar o modelo que está tentando editar, por favor, tente novamente ou entre em contato."
        }))

  }, [id])

  const saveSchema = async (schema: SchemaDto) => {
    try {
      await schemasService.saveSchema(schema)
      setToastInfo({
        title: (
          <>
            <FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-green-500' />
            Modelo salvo com sucesso!
          </>
        ),
        message: ""
      })
      return true
    } catch (error: any) {
      setToastInfo({
        title: (
          <>
            <FontAwesomeIcon icon={faTriangleExclamation} className='mr-2 text-red-500' />
            Erro ao salvar modelo!
          </>
        ),
        message: error.message
      })
      return false
    }
  }

  return (
    <>
      {!!toastInfo && (
        <Toast
          title={toastInfo.title}
          message={toastInfo.message}
          onClose={() => setToastInfo(undefined)}
        />
      )}
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
