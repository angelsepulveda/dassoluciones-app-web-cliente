import { BaseService } from "@/lib/baseService"
import { TAction, TRegisterAction } from "@/models"

const API_BASE_URL = process.env.EXTERNAL_API_URL || "https://localhost:7210/api"

export class ActionApiService extends BaseService {
	constructor() {
		super(API_BASE_URL)
	}

	async getAll (): Promise<TAction[]> {
		return await this.apiClient.get<TAction[]>('/actions')
	}

	async register (data: TRegisterAction): Promise<TAction> {
		return await this.apiClient.post<TAction>("/actions", data)
	}

	async update (data: TAction): Promise<TAction> {
		await this.apiClient.put<number>('/actions', data)

		return data;
	}

	async delete (id: string): Promise<string> {
		await this.apiClient.delete(`/actions/ ${id}`)
		return id;
	}
}