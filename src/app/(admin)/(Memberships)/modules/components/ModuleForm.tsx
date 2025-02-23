import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TModule } from '@/models/memberships/module';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type TModuleFormProps = {
  module: TModule | null;
  onSubmit: (user: TModule) => void;
  isSubmitting: boolean;
};

export default function ModuleForm({
  module,
  onSubmit,
  isSubmitting,
}: TModuleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TModule>({
    defaultValues: module || {
      name: '',
    },
  });

  React.useEffect(() => {
    if (module) {
      reset(module);
    } else {
      reset({ name: '' });
    }
  }, [module, reset]);

  const onSubmitForm: SubmitHandler<TModule> = (data) => {
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
        {module ? 'Editar' : 'Registrar'}
      </Button>
    </form>
  );
}
