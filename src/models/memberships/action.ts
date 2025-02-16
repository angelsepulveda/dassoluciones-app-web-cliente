export type TAction = {
	id?: string
	name: string
}

export type TRegisterAction = Omit<TAction, "id">