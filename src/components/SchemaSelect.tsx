import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { ServicesContext } from '../contexts/ServiceContext';

type SelectProps = {
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  onChange?: (value: string) => void
};

export const SchemaSelect: React.FC<SelectProps> = ({ label, placeholder = "Selecione um modelo", onChange, className, disabled }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const { schemasService } = useContext(ServicesContext)

  // Fetch options using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["schemasListQuery"],
    queryFn: async () => await schemasService.getAllOptions()
  });

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  const unselectedOptionLabel = () => {
    if (isLoading) return "Carregando..."
    if (error) return "Erro ao carregar modelos"
    return placeholder
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <select
          className="w-full min-w-60 px-3 py-2 text-gray-800 aria-[errormessage]:text-red-500 border rounded-md shadow-sm appearance-none bg-white border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={selectedValue || ''}
          onChange={(e) => handleSelect(e.target.value)}
          disabled={isLoading || !!error || disabled}
          aria-errormessage={!!error ? "Erro ao carregar modelos" : undefined}
        >
          <option value="">{unselectedOptionLabel()}</option>
          {data && data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
