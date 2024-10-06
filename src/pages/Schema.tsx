import React, { ReactNode, useState } from 'react'
import { FieldEditor } from '../components/FieldEditor'
import { Field } from '../types/Field'
import { api } from '../utils/api'
import { FieldType } from '../types/FieldType'
import { Toast } from '../components/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

interface SchemaDto {
  name: string
  json_schema: Field
}

export const Schema: React.FC = () => {
  const [toastInfo, setToastInfo] = useState<{ title: ReactNode, message: string }>();

  const saveSchema = async (schema: SchemaDto) => {
    try {
      api.put("/schemas", schema)
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
        onSave={async (name, properties) =>
          await saveSchema({
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
