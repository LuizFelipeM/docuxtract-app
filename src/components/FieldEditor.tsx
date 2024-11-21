import React, { useEffect, useState } from 'react';
import { Field } from '../types/Field';
import { FieldInput } from './FieldInput';
import { FieldType } from '../types/FieldType';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createEmptyField } from '../utils/createEmptyField';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface FieldEditorProps {
  name?: string
  fields?: Field[]
  isLoading?: boolean
  onSave?: (name: string, schema: Field[]) => void
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ name: initialName, fields: initialFields, isLoading, onSave }) => {
  const { t } = useTranslation()

  const [name, setName] = useState<string>("")
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (initialFields)
      setFields(initialFields)
  }, [initialFields])

  useEffect(() => {
    if (initialName)
      setName(initialName)
  }, [initialName])

  const handleFieldChange = (index: number) => (updatedField: Field) => {
    setFields(f => {
      const updatedFields = [...f];
      updatedFields[index] = updatedField;
      return updatedFields
    });
  };

  const addField = () => {
    setFields(f => [...f, createEmptyField()]);
  };

  const removeField = (index: number) => {
    setFields(f => f.filter((_, i) => i !== index));
  };

  const checkFieldIsValid = (field: Field): boolean =>
    !!field.name &&
    !!field.type &&
    !!field.description &&
    (![FieldType.object, FieldType.array].includes(field.type) || (
      (field.type === FieldType.object && !!field.properties && field.properties.reduce((prev, curr) => prev && checkFieldIsValid(curr), true)) ||
      (field.type === FieldType.array && !!field.items && checkFieldIsValid(field.items))
    ))

  const saveSchema = async () => {
    if (!name) {
      toast.error(t("schemaNameRequired"))
      return
    }

    if (fields.length === 0) {
      toast.error(t("theSchemaMustHaveAtLeastOneField"))
      return
    }

    const isSchemaValid = fields.reduce((prev, curr) => prev && checkFieldIsValid(curr), true)
    if (!isSchemaValid) {
      toast.error(t("invalidSchemaFields"))
      return
    }

    onSave?.(name, fields)
    setName("")
    setFields([])
  }

  return (
    <>
      <div className="flex flex-col max-w-[850px] mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          {t("modelName")}:
          <input
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ml-2 p-1 border rounded "
            disabled={isLoading}
            required
          />
        </h1>

        <h2 className="text-2xl font-bold mb-4">{t("fieldsToBeExtracted")}</h2>

        {fields.length === 0 && (
          <p>
            {t("addFieldsToBeFilledOnDataExtraction")}
          </p>
        )}

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="p-4 border rounded-md bg-neutral-50">
              <FieldInput
                field={field}
                isLoading={isLoading}
                onChange={handleFieldChange(index)}
                onRemove={() => removeField(index)}
              />
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={addField} disabled={isLoading}>
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            {t("addField")}
          </button>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={saveSchema} disabled={isLoading}>
            <FontAwesomeIcon icon={faFloppyDisk} className='mr-2' />
            {t("saveSchema")}
          </button>
        </div>
      </div>
    </>
  );
};


