import { TAction, TRegisterAction } from "@/models"

const API_URL = "/api/actions"

export const actionService = {
	async getAll (): Promise<TAction[]> {
		const response = await fetch(API_URL)
		if (!response.ok) {
			throw new Error("Failed to fetch actions")
		}
		return response.json()
	},

	async create (action: TRegisterAction): Promise<TAction> {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action),
		})
		if (!response.ok) {
			throw new Error("Failed to register action")
		}
		return response.json()
	},

	async update (action: TAction): Promise<TAction> {
		const response = await fetch(API_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action),
		})
		if (!response.ok) {
			throw new Error("Failed to update action")
		}
		return response.json()
	},

	async delete (id: string): Promise<void> {
		const response = await fetch(`${API_URL}?id=${id}`, {
			method: "DELETE",
		})
		if (!response.ok) {
			throw new Error("Failed to delete action")
		}
	},
}

