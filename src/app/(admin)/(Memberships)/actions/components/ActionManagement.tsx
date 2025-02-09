'use client';

import {
  Button,
  ConfirmationModal,
  DataGrid,
  Modal,
  SearchGrid,
  SideAlert,
  TColumn,
} from '@/components';
import { useActions } from '@/hooks/useActions';
import { TAction } from '@/models';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import ActionForm from './ActionForm';

interface AlertState {
  message: string;
  type: 'success' | 'error';
}

type SortField = 'name';
type SortOrder = 'asc' | 'desc';

const ITEMS_PER_PAGE = 5;

export default function ActionManagement() {
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
  const [currentAction, setCurrentAction] = useState<TAction | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredAndSortedUsers = useMemo(() => {
    return (actions || [])
      .filter((action) =>
        action.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [actions, sortField, sortOrder, appliedSearchTerm]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE);

  const currentModules = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedUsers, currentPage]);

  const handleCreate = () => {
    setCurrentAction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (action: TAction) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = (id: string) => {
    setActionToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = (): void => {
    if (actionToDelete !== null) {
      setIsDeleting(true);
      try {
        deleteAction(actionToDelete)
          .then((result) => {
            setAlert({
              message: 'Accion eliminada exitosamente',
              type: 'success',
            });
            if (currentModules.length === 1 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          })
          .catch((error) => {
            setAlert({ message: 'Ha fallado la eliminacion', type: 'error' });
          });
      } catch (error) {
        setAlert({ message: 'Ha fallado la eliminacion', type: 'error' });
      } finally {
        setIsDeleting(false);
      }
    }
    setIsConfirmModalOpen(false);
    setActionToDelete(null);
  };

  const handleSubmit = async (data: Omit<TAction, 'id'>) => {
    setIsSubmitting(true);
    try {
      if (currentAction) {
        await updateAction({
          ...data,
          id: currentAction.id,
        });
        setAlert({
          message: 'acción actualizado exitosamente',
          type: 'success',
        });
      } else {
        await createAction(data);
        setAlert({
          message: 'Acción registrado exitosamente',
          type: 'success',
        });
        setCurrentPage(
          Math.ceil((filteredAndSortedUsers.length + 1) / ITEMS_PER_PAGE)
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      setAlert({ message: 'Ha fallado', type: 'error' });
    } finally {
      setIsSubmitting(false);
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

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const renderLoadingState = () => (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      <span className="ml-2 text-gray-600 dark:text-gray-400">
        Cargando acciones...
      </span>
    </div>
  );

  const columns: TColumn<TAction>[] = [{ key: 'name', header: 'Nombre' }];

  const renderActions = (module: TAction) => (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleEdit(module)}
        icon={<Edit size={18} />}
        className="mr-2"
      >
        Editar
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleDeleteConfirmation(module.id ?? '')}
        icon={<Trash2 size={18} />}
      >
        Eliminar
      </Button>
    </>
  );

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error en carga de acciones
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {alert && (
        <SideAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Acciones
        </h2>
        <Button onClick={handleCreate} icon={<Plus size={18} />}>
          Registar acción
        </Button>
      </div>
      <SearchGrid
        handleClearSearch={handleClearSearch}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        appliedSearchTerm={appliedSearchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? (
        renderLoadingState()
      ) : (
        <>
          {/* DataGrid para pantallas más grandes */}
          <div className="hidden md:block">
            <DataGrid
              data={currentModules}
              columns={columns}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              actions={renderActions}
            />
          </div>

          {/* Cards para pantallas móviles */}
          <div className="md:hidden space-y-4">
            {currentModules.map((module) => (
              <div
                key={module.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition duration-150 ease-in-out"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {module.name}
                </h3>
                <div className="flex justify-end">{renderActions(module)}</div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </Button>
            {renderPaginationButtons()}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {currentAction ? 'Editar acciones' : 'Registrar nuevo acción'}
        </h2>
        <ActionForm
          action={currentAction}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        confirmText="Eliminar"
        text="Eliminar"
        cancelText="Cancelar"
        message="¿Está seguro que desea eliminar esta acción? Esta acción no se puede deshacer."
        isDeleting={isDeleting}
      />
    </div>
  );
}
