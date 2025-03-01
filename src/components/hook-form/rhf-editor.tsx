import { Controller, useFormContext } from 'react-hook-form';

import { Editor } from '../editor';

// ----------------------------------------------------------------------

type Props = {
  name: string,
  helperText?: React.ReactNode
}

export function RHFEditor({ name, helperText, ...other }: Props) {
  const {
    control,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          {...field}
          // @ts-expect-error
          error={!!error}
          helperText={error?.message ?? helperText}
          resetValue={isSubmitSuccessful}
          {...other}
        />
      )}
    />
  );
}
