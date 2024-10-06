import { Field } from "../types/Field";
import { FieldType, FieldTypeMap } from "../types/FieldType";
import { FieldProperties } from "./FieldProperties";

interface FieldInputProps {
  field: Field;
  onChange: (field: Field) => void;
  onRemove?: () => void;
}

export const FieldInput: React.FC<FieldInputProps> = ({ field, onChange, onRemove }) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-center">
        <input
          type="text"
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => onChange({ ...field, name: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={field.type}
          onChange={(e) => {
            const type = e.target.value as FieldType

            onChange({
              ...field,
              type,
              items: type === 'array' ? {} as Field : undefined
            })
          }}
          className="border p-2 rounded"
        >
          {Object.values(FieldType).map((key) => (
            <option key={key} value={key}>
              {FieldTypeMap.get(key)}
            </option>
          ))}
        </select>

        <div className="flex flex-col">
          <span className="mb-2 text-sm font-medium text-gray-900">Obrigatório?</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onChange({ ...field, required: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>

        <input
          type="text"
          placeholder="Description"
          value={field.description}
          onChange={(e) => onChange({ ...field, description: e.target.value })}
          className="border p-2 rounded"
        />
        {onRemove && (
          <button className="text-red-500" onClick={onRemove}>
            Remover
          </button>
        )}
      </div>

      <FieldProperties field={field} onChange={onChange} />
    </>
  );
};