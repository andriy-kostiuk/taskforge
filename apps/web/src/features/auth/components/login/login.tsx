'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginInput } from '@taskforge/contracts';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { AuthCard } from '../auth-card';
import { FieldConfig } from '../../types';
import { toast } from 'react-toastify';
import { getApiError, login } from '@/shared/api';

export const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await login(data);

      router.push('/');
    } catch (error) {
      const { displayMessage } = getApiError(error);

      toast.error(displayMessage);
    }
  };

  const fields: FieldConfig<LoginInput>[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: {
        required: 'Name is required',
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: {
        required: 'Password is required',
      },
    },
  ];

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to manage your tasks, track project progress, and keep your workflow moving."
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ name, label, type, validation }) => {
          return (
            <fieldset
              key={name}
              className="flex flex-col gap-2"
              disabled={isSubmitting}
            >
              <label
                htmlFor={name}
                className="pl-2.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
              >
                {label}
              </label>
              <Input
                id={name}
                {...register(name, validation)}
                type={type}
                className="h-11 rounded-xl bg-background/80 px-3 text-sm shadow-xs"
              />

              {errors[name] && (
                <p className="pl-2.5 text-sm font-medium text-error">
                  {errors[name].message}
                </p>
              )}
            </fieldset>
          );
        })}

        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl"
            disabled={isSubmitting}
          >
            Sign in
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-xl"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            Create account
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};
