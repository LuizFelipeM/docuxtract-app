import React from "react";
import { PageLayout } from "../components/PageLayout";

export const SchemasList: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <h2 className="text-2xl font-bold">List of Schemas</h2>
        <p>Here you will see all the schemas you have created.</p>
        {/* Exibir os schemas cadastrados aqui */}
      </div>
    </PageLayout>
  );
};
