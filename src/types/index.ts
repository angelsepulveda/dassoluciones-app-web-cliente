export interface AlertState {
	message: string;
	type: 'success' | 'error';
}

export type SortField = 'name';
export type SortOrder = 'asc' | 'desc';