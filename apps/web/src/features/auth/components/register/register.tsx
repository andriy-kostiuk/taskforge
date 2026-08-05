'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateUserInput } from '@taskforge/contracts';
import { useRouter } from 'next/navigation';
import type { HTMLInputTypeAttribute } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { RegisterOptions, SubmitHandler } from 'react-hook-form';

import { AuthCard } from '../auth-card';

type RegisterFormValues = CreateUserInput & {
  confirmPassword: string;
};

type FieldConfig = {
  name: keyof RegisterFormValues;
  label: string;
  type: HTMLInputTypeAttribute;
  validation?: RegisterOptions<RegisterFormValues, keyof RegisterFormValues>;
};

export const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log(data);
  };

  const password = useWatch({
    control,
    name: 'password',
  });

  const fields: FieldConfig[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validation: {
        required: 'Name is required',
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: {
        required: 'Email is required',
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      },
    },
    {
      name: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      validation: {
        required: 'Please confirm your password',
        validate: (value) => value === password || 'Passwords do not match',
      },
    },
  ];

  const handleBack = () => {
    router.push('/login');
  };

  return (
    <AuthCard
      title="Create your account"
      description="Set up your workspace to organize tasks, keep projects on track, and bring your team into one flow."
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ name, label, type, validation }) => {
          return (
            <div key={name} className="flex flex-col gap-2">
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
            </div>
          );
        })}

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" size="lg" className="w-full rounded-xl">
            Create account
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-xl"
            onClick={handleBack}
          >
            Back to login
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};
