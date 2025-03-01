import { Controller, useFormContext } from 'react-hook-form';

import Radio, { RadioProps } from '@mui/material/Radio';
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  name: string,
  label: string,
  options: {
    value: string,
    label: string
  }[],
  helperText?: React.ReactNode,
  slotProps: {
    wrap?: SxProps,
    formLabel: FormLabelProps,
    radio?: RadioProps,
    formHelperText: FormHelperTextProps
  }
}

export function RHFRadioGroup({ name, label, options, helperText, slotProps, ...other }: Props) {
  const { control } = useFormContext();

  const labelledby = `${name}-radio-buttons-group-label`;
  const ariaLabel = (val: string) => `Radio ${val}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" sx={slotProps?.wrap}>
          {label && (
            <FormLabel
              id={labelledby}
              component="legend"
              {...slotProps?.formLabel}
              sx={{ mb: 1, typography: 'body2', ...slotProps?.formLabel.sx }}
            >
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    {...slotProps?.radio}
                    inputProps={{
                      ...(!option.label && { 'aria-label': ariaLabel(option.label) }),
                      ...slotProps?.radio?.inputProps,
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }} {...slotProps?.formHelperText}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
