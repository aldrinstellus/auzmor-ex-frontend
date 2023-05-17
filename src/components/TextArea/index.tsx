import React, { ReactElement } from 'react';
import { Control, useController } from 'react-hook-form';
import clsx from 'clsx';

export type TextAreaProps = {
  placeholder?: string;
  readOnly?: boolean;
  defaultValue?: string;
  className?: string;
  rows?: number;
  children?: ReactElement;
  name?: string;
  dataTestId?: string;
  control?: Control<Record<string, any>>;
  error?: string;
  helpText?: string;
  showCounter?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  readOnly = false,
  className = '',
  rows = 1,
  children,
  control,
  name,
  dataTestId = '',
  defaultValue = '',
  error,
  helpText,
  showCounter = false,
}) => {
  const style = clsx(
    {
      'w-full p-5 text-sm font-medium text-neutral-900 bg-white rounded-9xl border border-solid border-neutral-200':
        !readOnly,
    },
    {
      'w-full text-sm p-0 resize-none overflow-y-hidden focus:none': readOnly,
    },
    {
      [className]: true,
    },
  );
  return (
    <>
      <textarea
        id="message"
        className={style}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
      >
        {children}
      </textarea>
    </>
  );
};

export default TextArea;
