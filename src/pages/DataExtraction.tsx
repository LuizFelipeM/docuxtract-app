import React, { useContext, useState } from "react";
import { JSONTable } from "../components/JSONTable";
import { SchemaSelect } from "../components/SchemaSelect";
import { ServicesContext } from "../contexts/ServiceContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { FileUpload } from "../components/FileUpload";

export const DataExtraction: React.FC = () => {
  const [schemaId, setSchemaId] = useState<string | undefined>(undefined)

  const { pipelinesService } = useContext(ServicesContext)

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["extractDataMutation"],
    mutationFn: async (file: File) => {
      if (!schemaId) {
        toast.error("Não é possível extrair informações sem um modelo selecionado.")
        return
      }

      const result = await pipelinesService.extractData(schemaId, file)
      toast.success("Extração realizada com sucesso!")
      return [result]
    },
    onError: (error) => {
      toast.error("Erro ao executar extração! Por favor, entre em contato com o time de suporte.")
      console.error(error)
    }
  })

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Extrair dados</h1>
      <div className="flex flex-row mb-8">
        <SchemaSelect
          className="mr-2"
          onChange={setSchemaId}
          disabled={isPending}
        />
        <FileUpload onUpload={(file) => mutate(file)} disabled={!schemaId || isPending} />
      </div>

      <JSONTable title="Resultados" data={data ?? []} />
    </div>
  );

};


