'use client';

import {
  Button,
  ConfirmationModal,
  DataGrid,
  LoadingState,
  Modal,
  PaginationButtons,
  SearchGrid,
  SideAlert,
  TColumn,
} from '@/components';
import { TSection } from '@/models';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { SectionForm } from '../SectionForm';
import { useSectionManagement } from './useSectionManagement';
import { SectionDataGridMobile } from './partials';
import {
  ERROR_LOADING_SECTIONS,
  LOADING_SECTIONS_MESSAGE,
  REGISTER_SECTION,
  SECTIONS_TITLE,
} from '../../utils';

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
        {ERROR_LOADING_SECTIONS}
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
          {SECTIONS_TITLE}
        </h2>
        <Button onClick={handleCreate} icon={<Plus size={18} />}>
          {REGISTER_SECTION}
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
        <LoadingState message={LOADING_SECTIONS_MESSAGE} />
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
          {currentData ? 'Editar sección' : 'Registrar nueva sección'}
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
