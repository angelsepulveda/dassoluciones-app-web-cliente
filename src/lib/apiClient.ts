type TRequestMethod = "GET" | "POST" | "PUT" | "DELETE"

interface RequestOptions {
	method: TRequestMethod
	headers?: Record<string, string>
	body?: any
}

interface ApiClientConfig {
	baseUrl: string
	headers?: Record<string, string>
}

export class ApiClient {
	private baseUrl: string
	private headers: Record<string, string>

	constructor(config: ApiClientConfig) {
		this.baseUrl = config.baseUrl
		this.headers = {
			"Content-Type": "application/json",
			...config.headers,
		}
	}

	private async request<T> (endpoint: string, options: RequestOptions): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`
		const headers = { ...this.headers, ...options.headers }
		const response = await fetch(url, {
			method: options.method,
			headers,
			body: options.body ? JSON.stringify(options.body) : undefined,
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return response.json()
	}

	async get<T> (endpoint: string, headers?: Record<string, string>): Promise<T> {
		return await this.request<T>(endpoint, { method: "GET", headers })
	}

	async post<T> (endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
		return await this.request<T>(endpoint, { method: "POST", body, headers })
	}

	async put<T> (endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
		return await this.request<T>(endpoint, { method: "PUT", body, headers })
	}

	async delete<T> (endpoint: string, headers?: Record<string, string>): Promise<T> {
		return await this.request<T>(endpoint, { method: "DELETE", headers })
	}

	setToken (token: string) {
		this.headers["Authorization"] = `Bearer ${token}`
	}

	setHeader (key: string, value: string) {
		this.headers[key] = value
	}
}

