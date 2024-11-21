import React, { useContext } from 'react'
import { FieldEditor } from '../components/FieldEditor'
import { FieldType } from '../types/FieldType'
import { SchemaDto } from '../types/SchemaDto'
import { ServicesContext } from '../contexts/ServiceContext'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export const Schema: React.FC = () => {
  const { schemasService } = useContext(ServicesContext)
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationKey: ["newSchemaMutation"],
    mutationFn: async (schema: SchemaDto) => {
      await schemasService.save(schema)
      toast.success(t("successSchemaSaved"))
    },
    onError: (error) => {
      toast.error(t("errorSavingSchema"))
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
              description: t("modelDescription", { name }),
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
