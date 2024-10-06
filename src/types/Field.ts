import { FieldType } from "./FieldType";

export interface Field {
  name: string;
  type: FieldType;
  required: boolean;
  description: string;
  properties?: Field[];
  items?: Field;
}