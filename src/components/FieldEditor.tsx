import React, { useState } from 'react';
import { Field } from '../types/Field';
import { FieldInput } from './FieldInput';
import { FieldType } from '../types/FieldType';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createEmptyField } from '../utils/createEmptyField';
import toast from 'react-hot-toast';

interface FieldEditorProps {
  fields?: Field[]
  onSave?: (name: string, schema: Field[]) => boolean | Promise<boolean>
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ fields: initialFields, onSave }) => {
  const [name, setName] = useState<string>("")
  const [fields, setFields] = useState<Field[]>(initialFields ?? []);

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
      toast.error("O nome do modelo é obrigatório!")
      return
    }

    if (fields.length === 0) {
      toast.error("Modelo inválido, o modelo deve ter ao menos 1 campo adicionado.")
      return
    }

    const isSchemaValid = fields.reduce((prev, curr) => prev && checkFieldIsValid(curr), true)
    if (!isSchemaValid) {
      toast.error("Modelo inválido, por favor, verifique os campos obrigatórios antes de tentar salvar novamente.")
      return
    }

    if (await onSave?.(name, fields)) {
      setName("")
      setFields([])
    }
  }

  return (
    <>
      <div className="flex flex-col max-w-[850px] mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Nome do modelo:
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ml-2 p-1 border rounded "
            required
          />
        </h1>

        <h2 className="text-2xl font-bold mb-4">Campos a serem extraídos</h2>

        {fields.length === 0 && (
          <p>
            Adicione campos que serão preenchidos ao utilizar este modelo para extrair os dados de seus arquivos.
          </p>
        )}

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="p-4 border rounded-md">
              <FieldInput
                field={field}
                onChange={handleFieldChange(index)}
                onRemove={() => removeField(index)}
              />
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={addField}>
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            Adicionar Campo
          </button>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={saveSchema}>
            <FontAwesomeIcon icon={faFloppyDisk} className='mr-2' />
            Salvar Modelo
          </button>
        </div>
      </div>
    </>
  );
};


