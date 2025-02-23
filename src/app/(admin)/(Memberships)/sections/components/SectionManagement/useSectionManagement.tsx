import { useSections } from '@/hooks/memberships/useSections';
import { TRegisterSection, TSection } from '@/models/memberships/section';
import { AlertState, SortField, SortOrder } from '@/types';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import { useMemo, useState, useCallback } from 'react';
import {
  ERROR_CREATE_MESSAGE,
  ERROR_DELETE_MESSAGE,
  ERROR_UPDATE_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  SUCCESS_DELETE_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} from '../../utils/constants';

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
        ({ name, key, description }) =>
          name.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
          key.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
          description?.toLowerCase().includes(appliedSearchTerm.toLowerCase())
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

  const handleCreate = useCallback(() => {
    setCurrentData(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((data: TSection) => {
    setCurrentData(data);
    setIsModalOpen(true);
  }, []);

  const handleDeleteConfirmation = useCallback((id: string) => {
    setSectionToDelete(id);
    setIsConfirmModalOpen(true);
  }, []);

  const handleDelete = useCallback((): void => {
    if (sectionToDelete !== null) {
      setIsDeleting(true);

      deleteSection(sectionToDelete)
        .then(() => {
          setAlert({
            message: SUCCESS_DELETE_MESSAGE,
            type: 'success',
          });
          if (currentSections.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        })
        .catch(() => {
          setAlert({
            message: ERROR_DELETE_MESSAGE,
            type: 'error',
          });
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
    setIsConfirmModalOpen(false);
    setSectionToDelete(null);
  }, [sectionToDelete, deleteSection, currentSections.length, currentPage]);

  const handleSubmit = useCallback(
    async (data: TRegisterSection) => {
      setIsSubmitting(true);

      const action = currentData ? updateSection : createSection;
      const successMessage = currentData
        ? SUCCESS_UPDATE_MESSAGE
        : SUCCESS_CREATE_MESSAGE;
      const errorMessage = currentData
        ? ERROR_UPDATE_MESSAGE
        : ERROR_CREATE_MESSAGE;

      action({ ...data, id: currentData?.id })
        .then(() => {
          setAlert({ message: successMessage, type: 'success' });
          setIsSubmitting(false);
          setIsModalOpen(false);
          if (!currentData) {
            setCurrentPage(
              Math.ceil((filteredAndSortedUsers.length + 1) / ITEMS_PER_PAGE)
            );
          }
        })
        .catch(() => {
          setAlert({ message: errorMessage, type: 'error' });
        });
    },
    [currentData, createSection, updateSection, filteredAndSortedUsers.length]
  );

  const handleSort = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortOrder('asc');
      }
    },
    [sortField, sortOrder]
  );

  const handleSearch = useCallback(() => {
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  }, [searchTerm]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setAppliedSearchTerm('');
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

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
