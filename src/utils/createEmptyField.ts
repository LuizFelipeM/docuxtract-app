import { Field } from "../types/Field"
import { FieldType } from "../types/FieldType"

export const createEmptyField = (): Field => ({
  name: '',
  type: FieldType.string,
  required: false,
  description: ''
})