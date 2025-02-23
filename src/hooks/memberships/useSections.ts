import { TRegisterSection, TSection } from "@/models/memberships/section"
import { sectionService } from "@/services/memberships/sectionService"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useSections () {
	const { data: sections, error, mutate } = useSWR<TSection[]>("/api/sections", fetcher)

	const createSection = async (data: TRegisterSection) => {
		try {
			const response = await sectionService.create(data)
			mutate([...(sections || []), response], false)
			return response
		} catch (error) {
			console.error("Error creating section:", error)
			throw error
		}
	}

	const updateSection = async (data: TSection) => {
		try {
			const response = await sectionService.update(data)
			mutate(
				sections?.map((section) => (section.id === response.id ? response : section)),
				false,
			)
			return response
		} catch (error) {
			console.error("Error updating section:", error)
			throw error
		}
	}

	const deleteSection = async (id: string) => {
		try {
			await sectionService.delete(id)
			mutate(
				sections?.filter((section) => section.id !== id),
				false,
			)
		} catch (error) {
			console.error("Error deleting section:", error)
			throw error
		}
	}

	return {
		sections,
		isLoading: !error && !sections,
		isError: error,
		createSection,
		updateSection,
		deleteSection,
		mutate,
	}
}

