import React from "react";
import { PageLayout } from "../components/PageLayout";

export const DataExtraction: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <h2 className="text-2xl font-bold">Data Extraction</h2>
        <p>Select a schema and extract data based on it.</p>
        {/* Formulário para selecionar schema e extrair dados */}
      </div>
    </PageLayout>
  );
};
