import { OptionDto } from "../types/OptionDto";
import { SchemaDto } from "../types/SchemaDto";
import { BaseService } from "./BaseService";

export class SchemasService extends BaseService {
  constructor(getAccessTokenSilently: () => Promise<string>) {
    super(getAccessTokenSilently);
  }

  async save(schema: SchemaDto): Promise<void> {
    return await this.PUT("/schemas", schema)
  }

  async getAllOptions(): Promise<OptionDto[]> {
    return await this.GET("/schemas/options")
  }

  async getAll(): Promise<SchemaDto[]> {
    return await this.GET("/schemas")
  }

  async get(id: string): Promise<SchemaDto> {
    return await this.GET(`/schemas/${id}`)
  }

  async delete(id: string): Promise<void> {
    await this.DELETE(`/schemas/${id}`)
  }
}