import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000
})

export abstract class BaseService {
  constructor(protected readonly getAccessTokenSilently: () => Promise<string>) { }

  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return (
      await api.get<T>(path, {
        ...config,
        headers: {
          Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
        },
      })
    ).data
  }

  protected async post<T, K>(path: string, data: T, config?: AxiosRequestConfig): Promise<K> {
    return (
      await api.post<K>(path, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
        },
      })
    ).data
  }

  protected async put<T>(path: string, data: T, config?: AxiosRequestConfig): Promise<void> {
    await api.put<T>(path, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
      },
    })
  }

  protected async patch<T>(path: string, data: T, config?: AxiosRequestConfig): Promise<void> {
    await api.patch(path, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
      },
    })
  }

  protected async delete(path: string, config?: AxiosRequestConfig): Promise<void> {
    await api.delete(path, {
      ...config,
      headers: {
        Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
      },
    })
  }
}