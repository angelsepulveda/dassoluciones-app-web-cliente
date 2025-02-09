import { BaseService } from "@/lib/baseService"
import { TModule } from "@/models"

const API_BASE_URL = process.env.EXTERNAL_API_URL || "https://localhost:7210/api/modules"

export class ModuleApiService extends BaseService {
	constructor() {
		super(API_BASE_URL)
	}

	async getAll () {
		return this.apiClient.get<TModule[]>("/get-all")
	}

	async register (module: Omit<TModule, "id">) {
		return this.apiClient.post<TModule>("/register", module)
	}

	async update (module: TModule) {
		this.apiClient.put<number>('/update', module)

		return module;
	}

	async delete (id: string) {
		this.apiClient.delete(`/delete/ ${id}`)
		return id;
	}
}