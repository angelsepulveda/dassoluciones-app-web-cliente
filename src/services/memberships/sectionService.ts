import { TRegisterSection, TSection } from "@/models/memberships/section"

const API_URL = "/api/sections"

export const sectionService = {
	async getAll (): Promise<TSection[]> {
		const response = await fetch(API_URL)
		if (!response.ok) {
			throw new Error("Failed to fetch sections")
		}
		return response.json()
	},

	async create (section: TRegisterSection): Promise<TSection> {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(section),
		})
		if (!response.ok) {
			throw new Error("Failed to register section")
		}
		return response.json()
	},

	async update (section: TSection): Promise<TSection> {
		const response = await fetch(API_URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(section),
		})
		if (!response.ok) {
			throw new Error("Failed to update section")
		}
		return response.json()
	},

	async delete (id: string): Promise<void> {
		const response = await fetch(`${API_URL}?id=${id}`, {
			method: "DELETE",
		})
		if (!response.ok) {
			throw new Error("Failed to delete section")
		}
	},
}

