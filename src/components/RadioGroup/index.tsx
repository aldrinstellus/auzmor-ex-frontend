import clsx from 'clsx';
import Divider from 'components/Divider';
import React, { useMemo } from 'react';
import { Control, useController } from 'react-hook-form';

export enum Variant {
  Radio = 'RADIO',
}

export enum Size {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

export interface IRadioButtonProps {
  name: string;
  id?: string;
  variant?: Variant;
  size?: Size;
  rightIcon?: string;
  leftIcon?: string;
  defaultValue?: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  dataTestId?: string;
  control?: Control<Record<string, any>>;
  label?: string;
  onLeftIconClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onRightIconClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const RadioGroup: React.FC<IRadioButtonProps> = ({
  name,
  id,
  variant = Variant.Radio,
  size = Size.Medium,
  rightIcon = null,
  leftIcon = null,
  defaultValue = '',
  placeholder = '',
  loading = false,
  disabled = false,
  className = '',
  dataTestId = '',
  error,
  helpText,
  control,
  label,
  onLeftIconClick,
  onRightIconClick,
}) => {
  const { field } = useController({
    name,
    control,
  });

  const radioStyles = useMemo(
    () =>
      clsx({
        'border-1 border-neutral-200 focus:outline-none': true,
      }),
    [error, size],
  );

  return (
    <>
      <div className="pt-3 pl-6 pb-3">
        <div className="flex justify-start items-center space-x-4">
          <input
            id={id}
            name={field.name}
            type={variant?.toLowerCase()}
            className={radioStyles}
            disabled={loading || disabled}
            placeholder={placeholder}
            data-testid={dataTestId}
            defaultValue={defaultValue}
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          <label htmlFor={field.name}>{field.name}</label>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default RadioGroup;
