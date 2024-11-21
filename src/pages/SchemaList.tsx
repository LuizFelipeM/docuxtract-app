import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ServicesContext } from "../contexts/ServiceContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const SchemasList: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()

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
      toast.error(t("errorDeletingSchema"))
      console.error(error)
    }
  })

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex flex-col max-w-[850px] mx-auto p-4">
          <h2 className="text-2xl font-bold mb-2">{t("yourSchemas")}</h2>
          <p className="mb-6">{t("hereAreAllYourSchemas")}</p>

          <table className="min-w-full table-auto border-collapse border-0">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">{t("schemaName")}</th>
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
                      {t("edit")}
                    </button>
                    <button
                      disabled={isLoading || isPending}
                      onClick={() => mutate(id!)}
                      className="bg-red-500 disabled:bg-gray-400 text-white px-3 py-1 rounded ml-2 transition-all transform-gpu"
                    >
                      <span className="block min-w-16">
                        {isLoading || isPending ?
                          <FontAwesomeIcon icon={faSpinner} spin /> :
                          t("delete")}
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
