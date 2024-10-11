import React, { useContext, useState } from "react";
import { SchemaDto } from "../types/SchemaDto";
import toast from "react-hot-toast";
import { ServicesContext } from "../contexts/ServiceContext";
import { useOnMountRequest } from "../hooks/useOnMountRequest";

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
