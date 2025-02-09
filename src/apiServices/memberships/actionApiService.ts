import { BaseService } from "@/lib/baseService"
import { TAction } from "@/models"

const API_BASE_URL = process.env.EXTERNAL_API_URL || "https://localhost:7210/api/actions"

export class ActionApiService extends BaseService {
	constructor() {
		super(API_BASE_URL)
	}

	async getAll () {
		return await this.apiClient.get<TAction[]>("/get-all")
	}

	async register (action: Omit<TAction, "id">) {
		return await this.apiClient.post<TAction>("/register", action)
	}

	async update (action: TAction) {
		await this.apiClient.put<number>('/update', action)

		return action;
	}

	async delete (id: string) {
		await this.apiClient.delete(`/delete/ ${id}`)
		return id;
	}
}