import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utils, writeFile } from "xlsx";
import { JSONObject } from "../types/JSONObject";
import { JSONValue } from "../types/JSONValue";
import React from "react";

interface JSONTableProps {
  title?: string
  data: JSONObject[];
}

export const JSONTable: React.FC<JSONTableProps> = ({ title, data }) => {
  const hasData = () => !!data && data.length > 0

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

  const Table: React.FC = () => {
    return (
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
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-row mb-4">
        <span className="flex-grow text-xl font-bold self-center">{title}</span>
        {hasData() &&
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded  self-center"
            onClick={exportToExcel}
          >
            <FontAwesomeIcon icon={faFileExcel} />
          </button>}
      </div>

      {hasData() ? <Table /> : <div>Sem informações disponíveis</div>}
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