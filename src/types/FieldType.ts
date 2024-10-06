export enum FieldType {
  string = "string",
  number = "number",
  datetime = "datetime",
  object = "object",
  array = "array",
}

export const FieldTypeMap = new Map<FieldType, string>([
  [FieldType.array, "Lista"],
  [FieldType.string, "Texto"],
  [FieldType.number, "Número"],
  [FieldType.datetime, "Data e Hora"],
  [FieldType.object, "Objeto"],
])