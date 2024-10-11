import React, { ReactNode, useContext, useEffect, useState } from "react";
import { SchemaDto } from "../types/SchemaDto";
import { ServicesContext } from "../contexts/ServiceContext";
import { Toast } from "../components/Toast";

export const SchemasList: React.FC = () => {
  const { schemasService } = useContext(ServicesContext)

  const [schemas, setSchemas] = useState<SchemaDto[]>([])
  const [toastInfo, setToastInfo] = useState<{ title: ReactNode, message: string }>();

  useEffect(() => {
    schemasService.getAllSchemas()
      .then((schemas) => setSchemas(schemas))
      .catch((err) => {
        setToastInfo({ title: "Erro ao consultar schemas", message: "Não foi possível buscar schemas" })
        console.error(err)
      })
  }, [])

  return (
    <>
      {!!toastInfo && (
        <Toast
          title={toastInfo.title}
          message={toastInfo.message}
          onClose={() => setToastInfo(undefined)}
        />
      )}

      <div>
        <h2 className="text-2xl font-bold">List of Schemas</h2>
        <p>Here you will see all the schemas you have created.</p>
        {schemas.map((schema) => (
          <div key={schema.id}>
            <p>{schema.id} - {schema.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};
