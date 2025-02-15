export type TSection = {
	id?: string
	name: string
	key: string
	description?: string
}

export type TRegisterSection = Omit<TSection, "id">