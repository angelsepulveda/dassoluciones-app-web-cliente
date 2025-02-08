import { ApiClient } from "./apiClient"

export class BaseService {
	protected apiClient: ApiClient

	constructor(baseUrl: string) {
		this.apiClient = new ApiClient({ baseUrl })
	}

	setToken (token: string) {
		this.apiClient.setToken(token)
	}

	setHeader (key: string, value: string) {
		this.apiClient.setHeader(key, value)
	}
}

