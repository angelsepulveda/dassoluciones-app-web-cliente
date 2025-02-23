'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TSection } from '@/models/memberships/section';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type TSectionFormProps = {
  section: TSection | null;
  onSubmit: (section: TSection) => void;
  isSubmitting: boolean;
};

export const SectionForm = ({
  section,
  onSubmit,
  isSubmitting,
}: TSectionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSection>({
    defaultValues: section || {
      name: '',
      key: '',
      description: '',
    },
  });

  useEffect(() => {
    if (section) {
      reset(section);
    } else {
      reset({ name: '', description: '', key: '' });
    }
  }, [section, reset]);

  const onSubmitForm: SubmitHandler<TSection> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <Input
        label="Nombre"
        id="name"
        {...register('name', {
          required: 'Es requerido',
          maxLength: {
            value: 50,
            message: 'no puede superar los 50 caracteres',
          },
        })}
        error={errors.name}
      />
      <Input
        label="Key"
        id="key"
        {...register('key', {
          required: 'Es requerido',
          maxLength: {
            value: 150,
            message: 'no puede superar los 156 caracteres',
          },
        })}
        error={errors.key}
      />
      <Input
        label="Descripción"
        id="description"
        {...register('description', {
          maxLength: {
            value: 256,
            message: 'no puede superar los 256 caracteres',
          },
        })}
        error={errors.key}
      />
      <Button type="submit" isLoading={isSubmitting}>
        {section ? 'Editar' : 'Registrar'}
      </Button>
    </form>
  );
};
