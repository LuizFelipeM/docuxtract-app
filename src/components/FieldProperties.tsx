import React from "react";
import { Field } from "../types/Field";
import { FieldInput } from "./FieldInput";
import { FieldType } from "../types/FieldType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface FieldPropertiesProps {
  field: Field;
  onChange: (field: Field) => void;
}

export const FieldProperties: React.FC<FieldPropertiesProps> = ({ field, onChange }) => {
  if (field.type === 'object') {
    return (
      <div className="ml-4">
        <h4 className="font-bold mb-2">Propriedades:</h4>
        {field.properties?.map((prop, index, array) => (
          <FieldInput
            key={index}
            field={prop}
            onChange={(updatedProp) => {
              const updatedProperties = [...(field.properties || [])];
              updatedProperties[index] = updatedProp;
              const updatedField = { ...field, properties: updatedProperties };
              onChange(updatedField);
            }}
            disableRemoveButton={array.length === 1}
            onRemove={() => {
              const updatedProperties = (field.properties || []).filter((_, i) => i !== index);
              const updatedField = { ...field, properties: updatedProperties };
              onChange(updatedField);
            }}
          />
        ))}
        <button
          onClick={() => {
            const updatedField: Field = {
              ...field,
              properties: [
                ...(field.properties || []),
                {
                  name: '',
                  type: FieldType.string,
                  required: false,
                  description: ''
                }
              ],
            };
            onChange(updatedField);
          }}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          <FontAwesomeIcon icon={faPlus} className='mr-2' />
          Adicionar Propriedade
        </button>
      </div>
    );
  }

  if (field.type === 'array' && field.items) {
    return (
      <div className="ml-4">
        <h4 className="font-bold mb-2">Tipo de itens na lista:</h4>
        <FieldInput
          field={field.items}
          onChange={(updatedItem) => onChange({ ...field, items: updatedItem })}
        />
      </div>
    );
  }
  return null;
};