import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { FieldEditor } from '../components/FieldEditor'
import { ServicesContext } from '../contexts/ServiceContext'
import { FieldType } from '../types/FieldType'
import { SchemaDto } from '../types/SchemaDto'
import { useTranslation } from 'react-i18next'

export const SchemaEdit: React.FC = () => {
  let { id } = useParams()
  const { t } = useTranslation()

  if (!id)
    toast.error(t("unableToFindTheSelectedSchema"))

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
        name={data?.name}
        fields={data?.json_schema?.properties}
        isLoading={isLoading}
        onSave={(name, properties) => {
          mutate({
            id: data?.id,
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
