import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000
})

export abstract class BaseService {
  constructor(protected readonly getAccessTokenSilently: () => Promise<string>) { }

  private getErrorMessage(error: unknown) {
    if (error instanceof AxiosError) return error.response?.data?.message
    return String(error)
  }

  protected async GET<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      return (
        await api.get<T>(path, {
          ...config,
          headers: {
            Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
          },
        })
      ).data
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }

  protected async POST<T, K>(path: string, data: T, config?: AxiosRequestConfig): Promise<K> {
    try {
      return (
        await api.post<K>(path, data, {
          ...config,
          headers: {
            Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
          },
        })
      ).data
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }

  protected async PUT<T>(path: string, data: T, config?: AxiosRequestConfig): Promise<void> {
    try {
      await api.put<T>(path, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
        },
      })
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }

  protected async PATCH<T>(path: string, data: T, config?: AxiosRequestConfig): Promise<void> {
    try {
      await api.patch(path, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
        },
      })
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }

  protected async DELETE(path: string, config?: AxiosRequestConfig): Promise<void> {
    try {
      await api.delete(path, {
        ...config,
        headers: {
          Authorization: `Bearer ${await this.getAccessTokenSilently()}`,
        },
      })
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }
}