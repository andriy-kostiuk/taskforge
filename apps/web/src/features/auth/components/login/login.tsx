'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginInput } from '@taskforge/contracts';
import { useRouter } from 'next/navigation';
import type { HTMLInputTypeAttribute } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { AuthCard } from '../auth-card';

const MESSAGES = {
  required: 'This field is required',
};

export const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log(data);
  };

  const fields: {
    name: keyof LoginInput;
    label: string;
    type: HTMLInputTypeAttribute;
  }[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
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
        {fields.map(({ name, label, type }) => {
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
                {...register(name, { required: MESSAGES.required })}
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
            Sign in
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-xl"
            onClick={handleRegister}
          >
            Create account
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};
