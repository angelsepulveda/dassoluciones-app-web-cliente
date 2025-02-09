import { TAction } from "@/models"
import { actionService } from "@/services"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useActions () {
	const { data: actions, error, mutate } = useSWR<TAction[]>("/api/actions", fetcher)

	const createAction = async (data: Omit<TAction, "id">) => {
		try {
			const newAction = await actionService.create(data)
			mutate([...(actions || []), newAction], false)
			return newAction
		} catch (error) {
			console.error("Error creating action:", error)
			throw error
		}
	}

	const updateAction = async (data: TAction) => {
		try {
			const updatedAction = await actionService.update(data)
			mutate(
				actions?.map((action) => (action.id === updatedAction.id ? updatedAction : action)),
				false,
			)
			return updatedAction
		} catch (error) {
			console.error("Error updating action:", error)
			throw error
		}
	}

	const deleteAction = async (id: string) => {
		try {
			await actionService.delete(id)
			mutate(
				actions?.filter((action) => action.id !== id),
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

