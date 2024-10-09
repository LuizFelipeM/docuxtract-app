import { Field } from "./Field"

export interface SchemaDto {
  id?: string
  name: string
  json_schema: Field
}