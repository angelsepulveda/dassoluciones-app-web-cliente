import { TAction, TRegisterAction } from "@/models"
import { actionService } from "@/services"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useActions () {
	const { data: actions, error, mutate } = useSWR<TAction[]>("/api/actions", fetcher)

	const createAction = async (data: TRegisterAction) => {
		try {
			const response = await actionService.create(data)
			mutate([...(actions || []), response], false)
			return response
		} catch (error) {
			console.error("Error creating action:", error)
			throw error
		}
	}

	const updateAction = async (data: TAction) => {
		try {
			const response = await actionService.update(data)
			mutate(
				actions?.map((section) => (section.id === response.id ? response : section)),
				false,
			)
			return response
		} catch (error) {
			console.error("Error updating action:", error)
			throw error
		}
	}

	const deleteAction = async (id: string) => {
		try {
			await actionService.delete(id)
			mutate(
				actions?.filter((section) => section.id !== id),
				false,
			)
		} catch (error) {
			console.error("Error deleting action:", error)
			throw error
		}
	}

	return {
		actions,
		isLoading: !error && !actions,
		isError: error,
		createAction,
		updateAction,
		deleteAction,
		mutate,
	}
}