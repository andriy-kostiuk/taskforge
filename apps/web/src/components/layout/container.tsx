import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hasMaxWidth?: boolean;
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  hasMaxWidth = true,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        'w-full mx-auto px-3 xs:px-3 sm:px-4 lg:px-8 xl:px-16',
        hasMaxWidth && 'max-w-content',
        className,
      )}
    >
      {children}
    </div>
  );
};
