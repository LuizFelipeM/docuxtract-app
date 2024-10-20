import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ServicesContext } from "../contexts/ServiceContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const SchemasList: React.FC = () => {
  const navigate = useNavigate();

  const { schemasService } = useContext(ServicesContext)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["schemasListQuery"],
    retry: false,
    queryFn: async () => await schemasService.getAll(),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["schemasListMutation"],
    mutationFn: async (id: string) => {
      await schemasService.delete(id)
      refetch()
    },
    onError: (error) => {
      toast.error("Não foi possível deletar o modelo, por favor, entre em contato com o time de suporte.")
      console.error(error)
    }
  })

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
              {data?.map(({ id, name }) => (
                <tr key={id} className="hover:bg-gray-200 transition-all transform-gpu">
                  <td className="border-b p-2">
                    {name}
                  </td>
                  <td className="border-b p-2 text-right">
                    <button
                      disabled={isLoading || isPending}
                      onClick={() => navigate(`/schemas/${id}`)}
                      className="bg-blue-500 disabled:bg-gray-400 text-white px-3 py-1 rounded transition-all transform-gpu"
                    >
                      Editar
                    </button>
                    <button
                      disabled={isLoading || isPending}
                      onClick={() => mutate(id!)}
                      className="bg-red-500 disabled:bg-gray-400 text-white px-3 py-1 rounded ml-2 transition-all transform-gpu"
                    >
                      <span className="block min-w-16">
                        {isLoading || isPending ?
                          <FontAwesomeIcon icon={faSpinner} spin /> :
                          'Deletar'}
                      </span>
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
