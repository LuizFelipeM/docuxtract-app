import React, { useContext, useEffect, useState } from "react";
import { SchemaDto } from "../types/SchemaDto";
import toast from "react-hot-toast";
import { ServicesContext } from "../contexts/ServiceContext";

export const SchemasList: React.FC = () => {
  const { schemasService } = useContext(ServicesContext)
  const [schemas, setSchemas] = useState<SchemaDto[]>([])

  useEffect(() => {
    schemasService.getAllSchemas()
      .then((schemas) => setSchemas(schemas))
      .catch((err) => {
        toast.error("Não foi possível buscar schemas")
        console.error(err)
      })
  }, [])

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
