//#region Tables

import React, { useState } from "react";

export const InvoiceList = ({ invoices }: any) => {
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
//#endregion 

//#region Cards
export const InvoiceCard = ({ invoices }: any) => {
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
export const InvoiceAccordion = ({ invoices }: any) => {
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
export const InvoiceListWithModal = ({ invoices }: any) => {
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
export const InvoiceGrid = ({ invoices }: any) => {
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
