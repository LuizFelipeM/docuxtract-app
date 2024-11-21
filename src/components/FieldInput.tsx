import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field } from "../types/Field";
import { FieldType } from "../types/FieldType";
import { FieldProperties } from "./FieldProperties";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { createEmptyField } from "../utils/createEmptyField";
import { useTranslation } from "react-i18next";

interface FieldInputProps {
  field: Field;
  onChange: (field: Field) => void;
  disableRemoveButton?: boolean
  onRemove?: () => void;
  isLoading?: boolean
}

export const FieldInput: React.FC<FieldInputProps> = ({ field, onChange, disableRemoveButton, onRemove, isLoading }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="mb-3">
        <div className="flex flex-row">
          <h4 className="font-bold mb-2 flex-1">
            {t("field")}:
            <input
              type="text"
              placeholder={t("name")}
              value={field.name}
              onChange={(e) => onChange({ ...field, name: e.target.value })}
              className="ml-2 p-1 border rounded"
              disabled={isLoading}
              required
            />
          </h4>
          {onRemove && (
            <button
              className="text-white bg-red-500 px-4 py-1 rounded disabled:bg-slate-400 transition-all"
              onClick={onRemove}
              disabled={disableRemoveButton || isLoading}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
        <div className="mb-3 last:mb-0 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-900">{t("type")}</span>
            <select
              value={field.type}
              onChange={(e) => {
                const type = e.target.value as FieldType
                onChange({
                  ...field,
                  type,
                  properties: type === FieldType.object ? [createEmptyField()] : undefined,
                  items: type === FieldType.array ? createEmptyField() : undefined
                })
              }}
              className="border p-1 rounded"
              disabled={isLoading}
              required
            >
              {Object.values(FieldType).map((key) => (
                <option key={key} value={key}>
                  {t(key)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-900">{t("required")}?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onChange({ ...field, required: e.target.checked })}
                className="sr-only peer"
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>

          <div className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-900">{t("description")}</span>
            <textarea
              placeholder={t("description")}
              value={field.description}
              onChange={(e) => onChange({ ...field, description: e.target.value })}
              className="border p-1 rounded"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>

      <FieldProperties field={field} onChange={onChange} />
    </>
  );
};