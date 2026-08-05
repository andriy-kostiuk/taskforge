import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type FieldConfig<F extends FieldValues> = {
  name: keyof F;
  label: string;
  type: HTMLInputTypeAttribute;
  validation?: RegisterOptions<F, Path<F>>;
};
