import { SchemaDto } from "../types/SchemaDto";
import { BaseService } from "./BaseService";

export class SchemasService extends BaseService {
  constructor(getAccessTokenSilently: () => Promise<string>) {
    super(getAccessTokenSilently);
  }

  async saveSchema(schema: SchemaDto): Promise<void> {
    return await this.put("/schemas", schema)
  }

  async getAllSchemas(): Promise<SchemaDto[]> {
    return await this.get("/schemas")
  }

  async getSchema(id: string): Promise<SchemaDto> {
    return await this.get(`/schemas/${id}`)
  }
}