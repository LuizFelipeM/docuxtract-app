import { JSONObject } from "../types/JSONObject";
import { BaseService } from "./BaseService";

export class PipelinesService extends BaseService {
  constructor(getAccessTokenSilently: () => Promise<string>) {
    super(getAccessTokenSilently);
  }

  async extractData(modelId: string, file: File): Promise<JSONObject> {
    const formData = new FormData()
    formData.append("file", file)
    return await this.POST(`/pipelines/rag?id=${modelId}`, formData, {
      timeout: 300000,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }
}