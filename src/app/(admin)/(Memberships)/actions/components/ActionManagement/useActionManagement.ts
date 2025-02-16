import { useActions } from "@/hooks";
import { TAction, TRegisterAction } from "@/models";
import { AlertState, SortField, SortOrder } from "@/types";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

export function useActionManagement () {
	const {
		actions,
		isLoading,
		isError,
		createAction,
		updateAction,
		deleteAction,
	} = useActions();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [actionToDelete, setActionToDelete] = useState<string | null>(null);
	const [currentData, setCurrentData] = useState<TAction | null>(null);
	const [alert, setAlert] = useState<AlertState | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortField, setSortField] = useState<SortField>('name');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const [searchTerm, setSearchTerm] = useState('');
	const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const filteredAndSortedActions = useMemo(() => {
		return (actions || [])
			.filter(
				(data) =>
					data.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
			)
			.sort((a, b) => {
				if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
				if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
				return 0;
			});
	}, [actions, sortField, sortOrder, appliedSearchTerm]);

	const totalPages = Math.ceil(filteredAndSortedActions.length / ITEMS_PER_PAGE);

	const currentActions = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredAndSortedActions.slice(
			startIndex,
			startIndex + ITEMS_PER_PAGE
		);
	}, [filteredAndSortedActions, currentPage]);

	const handleCreate = () => {
		setCurrentData(null);
		setIsModalOpen(true);
	};

	const handleEdit = (data: TAction) => {
		setCurrentData(data);
		setIsModalOpen(true);
	};

	const handleDeleteConfirmation = (id: string) => {
		setActionToDelete(id);
		setIsConfirmModalOpen(true);
	};

	const handleDelete = (): void => {
		if (actionToDelete !== null) {
			setIsDeleting(true);

			deleteAction(actionToDelete)
				.then((result) => {
					setAlert({
						message: 'Acción eliminada correctamente',
						type: 'success',
					});
					if (currentActions.length === 1 && currentPage > 1) {
						setCurrentPage(currentPage - 1);
					}
				})
				.catch((error) => {
					setAlert({
						message: 'Falló la eliminación de la acción',
						type: 'error',
					});
				})
				.finally(() => {
					setIsDeleting(false);
				});
		}
		setIsConfirmModalOpen(false);
		setActionToDelete(null);
	};

	const handleSubmit = async (data: TRegisterAction) => {
		setIsSubmitting(true);

		if (currentData) {
			updateAction({
				...data,
				id: currentData.id,
			})
				.then((result) => {
					setAlert({
						message: 'Acción actualizado exitosamente',
						type: 'success',
					});
					setIsSubmitting(false);
					setIsModalOpen(false);
				})
				.catch((error) => {
					setAlert({ message: 'Failed to update acción', type: 'error' });
				});
		} else {
			createAction(data)
				.then((result) => {
					setAlert({
						message: 'Acción registrado exitosamente',
						type: 'success',
					});
					setCurrentPage(
						Math.ceil((filteredAndSortedActions.length + 1) / ITEMS_PER_PAGE)
					);
					setIsSubmitting(false);
					setIsModalOpen(false);
				})
				.catch((error) => {
					setAlert({ message: 'Failed to save Acción', type: 'error' });
				});
		}
	};

	const handleSort = (field: SortField) => {
		if (field === sortField) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortOrder('asc');
		}
	};

	const handleSearch = () => {
		setAppliedSearchTerm(searchTerm);
		setCurrentPage(1);
	};

	const handleClearSearch = () => {
		setSearchTerm('');
		setAppliedSearchTerm('');
		setCurrentPage(1);
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);
	};

	return {
		handleSearch,
		handleCreate,
		handleDelete,
		handleDeleteConfirmation,
		handleClearSearch,
		handleEdit,
		handleSort,
		handleSubmit,
		currentActions,
		filteredAndSortedActions,
		isConfirmModalOpen,
		isDeleting,
		isError,
		alert,
		isModalOpen,
		isSubmitting,
		isLoading,
		appliedSearchTerm,
		searchTerm,
		setIsConfirmModalOpen,
		setAlert,
		currentData,
		currentPage,
		sortField,
		sortOrder,
		setSearchTerm,
		totalPages,
		goToPage,
		setIsModalOpen,
	};
}
