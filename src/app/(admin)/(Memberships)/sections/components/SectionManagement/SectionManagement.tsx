'use client';

import {
  Button,
  ConfirmationModal,
  DataGrid,
  Modal,
  PaginationButtons,
  SearchGrid,
  SideAlert,
  TColumn,
} from '@/components';
import { TSection } from '@/models';
import { Edit, Loader2, Plus, Trash2 } from 'lucide-react';
import { SectionForm } from '../SectionForm';
import { useSectionManagement } from './useSectionManagement';
import { SectionDataGridMobile } from './partials';

export const SectionManagement = () => {
  const {
    handleEdit,
    handleClearSearch,
    handleDelete,
    handleCreate,
    handleDeleteConfirmation,
    handleSearch,
    handleSort,
    handleSubmit,
    isDeleting,
    isConfirmModalOpen,
    isModalOpen,
    isLoading,
    isError,
    isSubmitting,
    alert,
    appliedSearchTerm,
    searchTerm,
    setAlert,
    setIsConfirmModalOpen,
    currentData,
    currentPage,
    currentSections,
    totalPages,
    setSearchTerm,
    goToPage,
    sortOrder,
    sortField,
    setIsModalOpen,
  } = useSectionManagement();

  const renderLoadingState = () => (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      <span className="ml-2 text-gray-600 dark:text-gray-400">
        Cargando secciones...
      </span>
    </div>
  );

  const columns: TColumn<TSection>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'key', header: 'Key' },
    { key: 'description', header: 'Descripción' },
  ];

  const renderActions = (data: TSection) => (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleEdit(data)}
        icon={<Edit size={18} />}
        className="mr-2"
      >
        Editar
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleDeleteConfirmation(data.id ?? '')}
        icon={<Trash2 size={18} />}
      >
        Eliminar
      </Button>
    </>
  );

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error en carga de secciones
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
          Secciones
        </h2>
        <Button onClick={handleCreate} icon={<Plus size={18} />}>
          Registar sección
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
              data={currentSections}
              columns={columns}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              actions={renderActions}
            />
          </div>

          {/* Cards para pantallas móviles */}
          <SectionDataGridMobile
            sections={currentSections}
            renderActions={renderActions}
          />
          {/* Pagination controls */}
          <PaginationButtons
            currentPage={currentPage}
            goToPage={goToPage}
            totalPages={totalPages}
          />
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {currentData ? 'Editar seccion' : 'Registrar nuevo seccion'}
        </h2>
        <SectionForm
          section={currentData}
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
        message="¿Está seguro que desea eliminar esta sección? Esta acción no se puede deshacer."
        isDeleting={isDeleting}
      />
    </div>
  );
};
