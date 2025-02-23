import { TModule } from "@/models/memberships/module"

const API_URL = "/api/modules"

export const moduleService = {
	async getAll (): Promise<TModule[]> {
		const response = await fetch(API_URL)
		if (!response.ok) {
			throw new Error("Failed to fetch users")
		}
		return response.json()
	},

	async create (user: Omit<TModule, "id">): Promise<TModule> {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
		if (!response.ok) {
			throw new Error("Failed to create user")
		}
		return response.json()
	},

	async update (user: TModule): Promise<TModule> {
		const response = await fetch(API_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
		if (!response.ok) {
			throw new Error("Failed to update user")
		}
		return response.json()
	},

	async delete (id: string): Promise<void> {
		const response = await fetch(`${API_URL}?id=${id}`, {
			method: "DELETE",
		})
		if (!response.ok) {
			throw new Error("Failed to delete user")
		}
	},
}

