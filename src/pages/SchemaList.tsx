import React, { useContext, useState } from "react";
import { SchemaDto } from "../types/SchemaDto";
import toast from "react-hot-toast";
import { ServicesContext } from "../contexts/ServiceContext";
import { useOnMountRequest } from "../hooks/useOnMountRequest";
import { Link } from "react-router-dom";

export const SchemasList: React.FC = () => {
  const { schemasService } = useContext(ServicesContext)
  const [schemas, setSchemas] = useState<SchemaDto[]>([])

  useOnMountRequest(async () => {
    try {
      const result = await schemasService.getAllSchemas()
      setSchemas(result)
    } catch (error) {
      toast.error("Não foi possível buscar schemas")
      console.error(error)
    }
  })

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex flex-col max-w-[850px] mx-auto p-4">
          <h2 className="text-2xl font-bold mb-2">Seus modelos</h2>
          <p className="mb-6">Aqui estão todos os seus modelos criados, você pode edita-los e remove-los quando desejar.</p>
          <SchemaTable schemas={schemas} onDeleteSchema={id => console.log('delete id', id)} />
        </div>
      </div>
    </>
  );
};

interface SchemaTableProps {
  schemas: SchemaDto[];
  onDeleteSchema: (id: string) => void;
}

const SchemaTable: React.FC<SchemaTableProps> = ({
  schemas,
  onDeleteSchema,
}) => {
  // Handle delete with confirmation
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schema?')) {
      onDeleteSchema(id);
    }
  };

  return (
    <table className="min-w-full table-auto border-collapse border-0">
      <thead>
        <tr>
          <th className="border-b p-2 text-left">Nome do modelo</th>
          <th className="border-b p-2 text-right"></th>
        </tr>
      </thead>
      <tbody>
        {schemas.map(({ id, name }) => (
          <tr key={id} className="hover:bg-gray-200 transition-all transform-gpu">
            <td className="border-b p-2">
              {name}
            </td>
            <td className="border-b p-2 text-right">
              <Link
                to={`/schemas/${id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDeleteClick(id!)}
                className="bg-red-500 text-white px-3 py-1 rounded ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
