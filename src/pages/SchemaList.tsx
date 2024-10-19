import React, { useContext, useState } from "react";
import { SchemaDto } from "../types/SchemaDto";
import toast from "react-hot-toast";
import { ServicesContext } from "../contexts/ServiceContext";
import { useOnMountRequest } from "../hooks/useOnMountRequest";
import { useNavigate } from "react-router-dom";

export const SchemasList: React.FC = () => {
  const navigate = useNavigate();

  const { schemasService } = useContext(ServicesContext)
  const [schemas, setSchemas] = useState<SchemaDto[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useOnMountRequest(async () => {
    try {
      const result = await schemasService.getAll()
      setSchemas(result)
    } catch (error) {
      toast.error("Não foi possível buscar schemas")
      console.error(error)
    }
  })

  const handleDeleteClick = async (id: string) => {
    try {
      setIsLoading(true)
      await schemasService.delete(id)
      setSchemas(s => {
        const index = s.findIndex(schema => schema.id === id)
        if (index > -1)
          return s.filter((_, i) => i !== index);
        return s
      })
    } catch (error) {
      toast.error("Não foi possível deletar o modelo, por favor, entre em contato com o time de suporte.")
      console.error(error)
    }
    setIsLoading(false)
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex flex-col max-w-[850px] mx-auto p-4">
          <h2 className="text-2xl font-bold mb-2">Seus modelos</h2>
          <p className="mb-6">Aqui estão todos os seus modelos criados, você pode edita-los e remove-los quando desejar.</p>

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
                    <button
                      disabled={isLoading}
                      onClick={() => navigate(`/schemas/${id}`)}
                      className="bg-blue-500 disabled:bg-gray-400 text-white px-3 py-1 rounded transition-all transform-gpu"
                    >
                      Editar
                    </button>
                    <button
                      disabled={isLoading}
                      onClick={() => handleDeleteClick(id!)}
                      className="bg-red-500 disabled:bg-gray-400 text-white px-3 py-1 rounded ml-2 transition-all transform-gpu"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
