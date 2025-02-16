import { Button, Input } from '@/components';
import { TAction } from '@/models';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type TActionFormProps = {
  action: TAction | null;
  onSubmit: (action: TAction) => void;
  isSubmitting: boolean;
};

export const ActionForm = ({
  action,
  onSubmit,
  isSubmitting,
}: TActionFormProps) => {
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

  useEffect(() => {
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
        {...register('name', {
          required: 'Es requerido',
          maxLength: {
            value: 50,
            message: 'no puede superar los 50 caracteres',
          },
        })}
        error={errors.name}
      />
      <Button type="submit" isLoading={isSubmitting}>
        {action ? 'Editar' : 'Registrar'}
      </Button>
    </form>
  );
};
