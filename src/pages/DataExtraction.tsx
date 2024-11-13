import React, { useContext, useState } from "react";
import { JSONTable } from "../components/JSONTable";
import { SchemaSelect } from "../components/SchemaSelect";
import { ServicesContext } from "../contexts/ServiceContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { FileUpload } from "../components/FileUpload";

//#region Tables

const InvoiceList = ({ invoices }: any) => {
  const [expanded, setExpanded] = useState<any>({});

  const toggleExpand = (index: any) => {
    setExpanded((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <table className="min-w-full table-auto border-collapse border">
      <thead>
        <tr>
          <th className="border p-2">Due Date</th>
          <th className="border p-2">Bill To</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice: any, index: number) => (
          <React.Fragment key={index}>
            <tr>
              <td className="border p-2">{invoice.due_date}</td>
              <td className="border p-2">{invoice.bill_to_name}</td>
              <td className="border p-2">
                <button onClick={() => toggleExpand(index)}>
                  {expanded[index] ? 'Hide Items' : 'Show Items'}
                </button>
              </td>
            </tr>
            {expanded[index] && (
              <tr>
                <td colSpan={3}>
                  <table className="min-w-full border-collapse border mt-2">
                    <thead>
                      <tr>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item: any) => (
                        <tr key={item.id}>
                          <td className="border p-2">{item.description}</td>
                          <td className="border p-2">{item.quantity}</td>
                          <td className="border p-2">${item.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

// Example usage
const invoices = [
  {
    due_date: '2024-09-27',
    bill_to_name: 'BTG Pactual',
    items: [
      { id: 1, description: 'Brochure Design', quantity: 2, rate: 100 },
      { id: 2, description: 'Agenda', quantity: 290, rate: 20 },
      { id: 3, description: 'Clip', quantity: 200000, rate: 0.15 },
      { id: 4, description: 'Smartphone', quantity: 1, rate: 2000 },
    ],
  },
];

//#endregion 

//#region Cards
const InvoiceCard = ({ invoices }: any) => {
  const [expanded, setExpanded] = useState<any>({});

  const toggleExpand = (index: any) => {
    setExpanded((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {invoices.map((invoice: any, index: number) => (
        <div key={index} className="p-4 border rounded shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">{invoice.bill_to_name}</h2>
              <p className="text-gray-600">Due Date: {invoice.due_date}</p>
            </div>
            <button
              onClick={() => toggleExpand(index)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {expanded[index] ? 'Hide Items' : 'Show Items'}
            </button>
          </div>

          {expanded[index] && (
            <div className="mt-4">
              {invoice.items.map((item: any) => (
                <div key={item.id} className="flex justify-between border-t py-2">
                  <div>{item.description}</div>
                  <div>
                    {item.quantity} x ${item.rate}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

//#endregion

//#region Accordion
const InvoiceAccordion = ({ invoices }: any) => {
  const [openIndex, setOpenIndex] = useState<any>(null);

  const toggleOpen = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {invoices.map((invoice: any, index: number) => (
        <div key={index} className="border-b py-4">
          <div
            onClick={() => toggleOpen(index)}
            className="cursor-pointer flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{invoice.bill_to_name}</h3>
              <p>Due: {invoice.due_date}</p>
            </div>
            <button className="text-blue-500">
              {openIndex === index ? '▲' : '▼'}
            </button>
          </div>
          {openIndex === index && (
            <div className="pl-4 mt-2">
              {invoice.items.map((item: any) => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.description}</span>
                  <span>{item.quantity} x ${item.rate}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

//#endregion

//#region List with modal
const InvoiceListWithModal = ({ invoices }: any) => {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleOpenModal = (invoice: any) => setSelectedInvoice(invoice);
  const handleCloseModal = () => setSelectedInvoice(null);

  return (
    <div>
      {invoices.map((invoice: any, index: any) => (
        <div key={index} className="border p-4 my-2 flex justify-between">
          <div>
            <h3 className="font-bold">{invoice.bill_to_name}</h3>
            <p>Due Date: {invoice.due_date}</p>
          </div>
          <button
            onClick={() => handleOpenModal(invoice)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Items
          </button>
        </div>
      ))}

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedInvoice.bill_to_name}
            </h2>
            {selectedInvoice.items.map((item: any) => (
              <div key={item.id} className="flex justify-between py-2">
                <div>{item.description}</div>
                <div>{item.quantity} x ${item.rate}</div>
              </div>
            ))}
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

//#endregion

//#region Grid
const InvoiceGrid = ({ invoices }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {invoices.map((invoice: any, index: any) => (
        <div key={index} className="p-4 border rounded-md shadow-sm">
          <h3 className="font-bold">{invoice.bill_to_name}</h3>
          <p>Due: {invoice.due_date}</p>
          <div className="mt-4">
            {invoice.items.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.description}</span>
                <span>{item.quantity} x ${item.rate}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

//#endregion

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

      {/* <InvoiceList invoices={invoices} />
      <InvoiceCard invoices={invoices} />
      <InvoiceAccordion invoices={invoices} />
      <InvoiceListWithModal invoices={invoices} />
      <InvoiceGrid invoices={invoices} /> */}
    </div>
  );

};


