import { SchemaDto } from "../types/SchemaDto";
import { BaseService } from "./BaseService";

export class SchemasService extends BaseService {
  constructor(getToken: () => Promise<string>) {
    super(getToken);
  }

  async saveSchema(schema: SchemaDto): Promise<void> {
    return await this.put("/schemas", schema)
  }

  async getAllSchemas(): Promise<SchemaDto[]> {
    return await this.get("/schemas")
  }
}