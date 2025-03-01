import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel, { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import { InputBaseComponentProps, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type SelectProps = {
  name: string,
  native?: boolean,
  children: React.ReactNode,
  slotProps?: {
    paper?: SxProps
  },
  helperText?: React.ReactNode,
  inputProps?: InputBaseComponentProps,
  InputLabelProps?: Partial<MuiInputLabelProps>
}

export function RHFSelect({
  name,
  native,
  children,
  slotProps,
  helperText,
  inputProps,
  InputLabelProps,
  ...other
}: SelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-select-label`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: { PaperProps: { sx: { maxHeight: 220, ...slotProps?.paper } } },
            sx: { textTransform: 'capitalize' },
          }}
          InputLabelProps={{ htmlFor: labelId, ...InputLabelProps }}
          inputProps={{ id: labelId, ...inputProps }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type MultiSelectProps = {
  name: string,
  chip?: boolean,
  label: string,
  options: {
    value: string,
    label: string
  }[],
  checkbox?: boolean,
  placeholder?: string,
  slotProps?: {
    chip?: ChipProps,
    inputLabel?: MuiInputLabelProps,
    formHelperText?: FormHelperTextProps,
    select?: SelectProps,
    checkbox?: CheckboxProps
  },
  helperText?: React.ReactNode
}

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  slotProps,
  helperText,
  ...other
}: MultiSelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-select-label`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} {...other}>
          {label && (
            <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
              {label}
            </InputLabel>
          )}

          {/* @ts-expect-error */}
          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            label={label}
            renderValue={(selected) => {
              const selectedItems = options.filter((item) => selected.includes(item.value));

              if (!selectedItems.length && placeholder) {
                return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
              }

              if (chip) {
                return (
                  <Box sx={{ gap: 0.5, display: 'flex', flexWrap: 'wrap' }}>
                    {selectedItems.map((item) => (
                      <Chip
                        key={item.value}
                        size="small"
                        // @ts-expect-error
                        variant="soft"
                        label={item.label}
                        {...slotProps?.chip}
                      />
                    ))}
                  </Box>
                );
              }

              return selectedItems.map((item) => item.label).join(', ');
            }}
            {...slotProps?.select}
            inputProps={{ id: labelId, ...slotProps?.select?.inputProps }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {checkbox && (
                  <Checkbox
                    size="small"
                    disableRipple
                    checked={field.value.includes(option.value)}
                    {...slotProps?.checkbox}
                  />
                )}

                {option.label}
              </MenuItem>
            ))}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} {...slotProps?.formHelperText}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
