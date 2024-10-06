import { useState } from 'react';
import { Field } from '../types/Field';
import { FieldInput } from './FieldInput';
import { FieldType } from '../types/FieldType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const FieldEditor = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const handleFieldChange = (index: number, updatedField: Field) => {
    setFields(f => {
      const updatedFields = [...f];
      updatedFields[index] = updatedField;
      return updatedFields
    });
  };

  const addField = () => {
    setFields(f => [...f, { name: '', type: FieldType.string, required: false, description: '' }]);
  };

  const removeField = (index: number) => {
    setFields(f => f.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modelo de campos a serem extraídos</h1>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="p-4 border rounded-md">
            <FieldInput
              field={field}
              onChange={(updatedField) => handleFieldChange(index, updatedField)}
              onRemove={() => removeField(index)}
            />
          </div>
        ))}
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={addField}>
        <FontAwesomeIcon icon={faPlus} /> Adicionar campo
      </button>
    </div>
  );
};


