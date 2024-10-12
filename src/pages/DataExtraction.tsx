import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { utils, writeFile } from "xlsx";

type JSONValue = string | number | boolean | Date | Array<JSONValue> | JSONObject;
type JSONObject = { [key: string]: JSONValue };

// Utility to flatten nested objects into a single level
const flattenJSON = (obj: JSONObject, parentKey: string = '', res: JSONObject = {}): JSONObject => {
  for (let key in obj) {
    const propName = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
      flattenJSON(obj[key] as JSONObject, propName, res);
    } else if (Array.isArray(obj[key])) {
      const arrayItems = obj[key] as Array<JSONValue>;

      if (arrayItems.every(item => typeof item === 'object' && item !== null)) {
        arrayItems.forEach((item, index) => {
          flattenJSON(item as JSONObject, `${propName}[${index}]`, res);
        });
      } else {
        res[propName] = arrayItems.join(', ');
      }
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

interface JSONTableProps {
  title?: string
  data: JSONObject[];
}

const JSONTable: React.FC<JSONTableProps> = ({ title, data }) => {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Step 1: Flatten each JSON object
  const flattenedData = data.map((item) => flattenJSON(item));

  // Step 2: Get all unique keys (headers) dynamically from the flattened objects
  const allKeys = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))));

  // Function to export table content as an XLSX file
  const exportToExcel = () => {
    const worksheetData = flattenedData.map(item => {
      return allKeys.map(key => item[key] ?? ''); // Map the data for each key
    });

    // Prepare the worksheet and workbook
    const worksheet = utils.aoa_to_sheet([allKeys, ...worksheetData]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Data');

    // Export the file
    writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className="relative">
      <div className="flex flex-row mb-2">
        <span className="flex-grow">{title}</span>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={exportToExcel}
        >
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            {allKeys.map((key) => (
              <th key={key} className="border border-gray-300 px-4 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((item, index) => (
            <tr key={index}>
              {allKeys.map((key) => (
                <td key={key} className="border border-gray-300 px-4 py-2">
                  <JSONValueRenderer value={item[key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface JSONValueRendererProps {
  value: JSONValue | undefined;
}

const JSONValueRenderer: React.FC<JSONValueRendererProps> = ({ value }) => {
  if (value === undefined || value === null) return <span>-</span>;

  if (Array.isArray(value))
    return (
      <ul className="list-disc list-inside">
        {value.map((item, index) => (
          <li key={index}>
            <JSONValueRenderer value={item} />
          </li>
        ))}
      </ul>
    );

  if (value instanceof Date)
    return <span>{value.toISOString()}</span>;

  switch (typeof value) {
    case "string":
      return <span>{value}</span>;
    case "boolean":
      return <span>{value ? 'True' : 'False'}</span>;
    case "number":
      return <span>{value}</span>;
    default:
      throw new Error(`Unexpected type of ${typeof value}`)
  }
};

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
  const jsonData: JSONObject[] = [
    {
      name: "John Doe",
      age: 30,
      // registered: true,
      dateOfBirth: new Date(1990, 6, 20),
      addresses: [
        { street: "123 Main St", city: "Anytown" },
        { street: "456 Side St", city: "Othertown" },
      ],
    },
    {
      name: "Jane Smith",
      age: 25,
      registered: false,
      dateOfBirth: new Date(1995, 3, 15),
      addresses: [
        // { street: "789 Sheet St", city: "Unkowntown" },
        { street: "1003 Buceta St", city: "Abstown" },
      ],
    }
  ];

  const jsonData2: JSONObject[] = [
    {
      "due_date": "2024-09-27",
      "bill_to_name": "BTG Pactual",
      "items": [
        {
          "id": 1,
          "description": "Brochure Design",
          "quantity": 2,
          "rate": 100
        },
        {
          "id": 2,
          "description": "Agenda",
          "quantity": 290,
          "rate": 20
        },
        {
          "id": 3,
          "description": "Clip",
          "quantity": 200000,
          "rate": 0.15
        },
        {
          "id": 4,
          "description": "Smartphone",
          "quantity": 1,
          "rate": 2000
        }
      ]
    }
  ];


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dynamic JSON Table</h1>
      <JSONTable title="Resultados" data={jsonData} />
      <InvoiceList invoices={invoices} />
      <InvoiceCard invoices={invoices} />
      <InvoiceAccordion invoices={invoices} />
      <InvoiceListWithModal invoices={invoices} />
      <InvoiceGrid invoices={invoices} />
    </div>
  );

};


