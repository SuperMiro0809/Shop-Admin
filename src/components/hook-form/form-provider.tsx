import { FormProvider as RHFForm, FormProviderProps} from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode,
  onSubmit: () => {},
  methods: FormProviderProps
}

export function Form({ children, onSubmit, methods }: Props) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  );
}
