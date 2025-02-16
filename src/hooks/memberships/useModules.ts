import useSWR from "swr"

import { TModule } from "@/models"
import { moduleService } from "@/services"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useModules () {
	const { data: modules, error, mutate } = useSWR<TModule[]>("/api/modules", fetcher)

	const createModule = async (userData: Omit<TModule, "id">) => {
		try {
			const newModule = await moduleService.create(userData)
			mutate([...(modules || []), newModule], false)
			return newModule
		} catch (error) {
			console.error("Error creating module:", error)
			throw error
		}
	}

	const updateModule = async (moduleData: TModule) => {
		try {
			const updatedModule = await moduleService.update(moduleData)
			mutate(
				modules?.map((module) => (module.id === updatedModule.id ? updatedModule : module)),
				false,
			)
			return updatedModule
		} catch (error) {
			console.error("Error updating module:", error)
			throw error
		}
	}

	const deleteModule = async (id: string) => {
		try {
			await moduleService.delete(id)
			mutate(
				modules?.filter((module) => module.id !== id),
				false,
			)
		} catch (error) {
			console.error("Error deleting user:", error)
			throw error
		}
	}

	return {
		modules,
		isLoading: !error && !modules,
		isError: error,
		createModule,
		updateModule,
		deleteModule,
		mutate,
	}
}

