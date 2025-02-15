import { useSections } from '@/hooks';
import { TRegisterSection, TSection } from '@/models';
import { AlertState, SortField, SortOrder } from '@/types';
import { useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 5;

export function useSectionManagement() {
  const {
    sections,
    isLoading,
    isError,
    createSection,
    updateSection,
    deleteSection,
  } = useSections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<TSection | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredAndSortedUsers = useMemo(() => {
    return (sections || [])
      .filter(
        (data) =>
          data.name.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
          data.key.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
          data.description
            ?.toLowerCase()
            .includes(appliedSearchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [sections, sortField, sortOrder, appliedSearchTerm]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE);

  const currentSections = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedUsers, currentPage]);

  const handleCreate = () => {
    setCurrentData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (data: TSection) => {
    setCurrentData(data);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = (id: string) => {
    setSectionToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = (): void => {
    if (sectionToDelete !== null) {
      setIsDeleting(true);

      deleteSection(sectionToDelete)
        .then((result) => {
          setAlert({
            message: 'Sección eliminada correctamente',
            type: 'success',
          });
          if (currentSections.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        })
        .catch((error) => {
          setAlert({
            message: 'Falló la eliminación de la sección',
            type: 'error',
          });
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
    setIsConfirmModalOpen(false);
    setSectionToDelete(null);
  };

  const handleSubmit = async (data: TRegisterSection) => {
    setIsSubmitting(true);

    if (currentData) {
      updateSection({
        ...data,
        id: currentData.id,
      })
        .then((result) => {
          setAlert({
            message: 'Sección actualizado exitosamente',
            type: 'success',
          });
          setIsSubmitting(false);
          setIsModalOpen(false);
        })
        .catch((error) => {
          setAlert({ message: 'Failed to update sección', type: 'error' });
        });
    } else {
      createSection(data)
        .then((result) => {
          setAlert({
            message: 'Sección registrado exitosamente',
            type: 'success',
          });
          setCurrentPage(
            Math.ceil((filteredAndSortedUsers.length + 1) / ITEMS_PER_PAGE)
          );
          setIsSubmitting(false);
          setIsModalOpen(false);
        })
        .catch((error) => {
          setAlert({ message: 'Failed to save Sección', type: 'error' });
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
    currentSections,
    filteredAndSortedUsers,
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
