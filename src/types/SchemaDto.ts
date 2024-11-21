import { Field } from "./Field"

export interface SchemaDto {
  id?: string
  name: string
  language: string
  json_schema: Field
}