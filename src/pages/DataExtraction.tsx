import React, { useContext, useState } from "react";
import { JSONTable } from "../components/JSONTable";
import { SchemaSelect } from "../components/SchemaSelect";
import { ServicesContext } from "../contexts/ServiceContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { FileUpload } from "../components/FileUpload";
import { useTranslation } from "react-i18next";

export const DataExtraction: React.FC = () => {
  const [schemaId, setSchemaId] = useState<string | undefined>(undefined)

  const { pipelinesService } = useContext(ServicesContext)
  const { t } = useTranslation()

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["extractDataMutation"],
    mutationFn: async (file: File) => {
      if (!schemaId) {
        toast.error(t("errorUnselectedModel"))
        return
      }

      const result = await pipelinesService.extractData(schemaId, file)
      toast.success(t("successDataExtracted"))
      return [result]
    },
    onError: (error) => {
      toast.error(t("errorExecutingExtraction"))
      console.error(error)
    }
  })

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{t("extractData")}</h1>
      <div className="flex flex-row mb-8">
        <SchemaSelect
          className="mr-2"
          onChange={setSchemaId}
          disabled={isPending}
        />
        <FileUpload onUpload={(file) => mutate(file)} disabled={!schemaId || isPending} />
      </div>

      <JSONTable title={t("results")} data={data ?? []} />
    </div>
  );

};


