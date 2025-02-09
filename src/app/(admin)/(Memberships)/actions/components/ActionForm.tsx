import { Button, Input } from '@/components';
import { TAction } from '@/models';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type TActionFormProps = {
  action: TAction | null;
  onSubmit: (user: TAction) => void;
  isSubmitting: boolean;
};

export default function ActionForm({
  action,
  onSubmit,
  isSubmitting,
}: TActionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAction>({
    defaultValues: action || {
      name: '',
    },
  });

  React.useEffect(() => {
    if (action) {
      reset(action);
    } else {
      reset({ name: '' });
    }
  }, [action, reset]);

  const onSubmitForm: SubmitHandler<TAction> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <Input
        label="Nombre"
        id="name"
        {...register('name', { required: 'Es requerido' })}
        error={errors.name}
      />
      <Button type="submit" isLoading={isSubmitting}>
        {action ? 'Editar' : 'Registrar'}
      </Button>
    </form>
  );
}
