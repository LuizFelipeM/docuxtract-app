import { BaseService } from "./BaseService";

export class SchemasService extends BaseService {
  constructor(getToken: () => Promise<string>) {
    super(getToken);
  }
}