import { BaseService } from "@/lib/baseService"
import { TRegisterSection, TSection } from "@/models"

const API_BASE_URL = process.env.EXTERNAL_API_URL || "https://localhost:7210/api"

export class SectionApiService extends BaseService {
	constructor() {
		super(API_BASE_URL)
	}

	async getAll (): Promise<TSection[]> {
		return await this.apiClient.get<TSection[]>('/sections')
	}

	async register (data: TRegisterSection): Promise<TSection> {
		return await this.apiClient.post<TSection>("/sections", data)
	}

	async update (data: TSection): Promise<TSection> {
		await this.apiClient.put<number>('/sections', data)

		return data;
	}

	async delete (id: string): Promise<string> {
		await this.apiClient.delete(`/sections/ ${id}`)
		return id;
	}
}