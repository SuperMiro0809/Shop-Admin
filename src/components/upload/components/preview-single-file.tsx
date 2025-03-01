import { FileWithPath } from 'react-dropzone';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from '../../iconify';

// ----------------------------------------------------------------------

type SingleFilePreviewProps = {
  file: string | Blob & FileWithPath
};

export function SingleFilePreview({ file }: SingleFilePreviewProps) {
  const fileName = typeof file === 'string' ? file : file.name;

  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Box
        component="img"
        alt={fileName}
        src={previewUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type DeleteButtonProps = {
  sx?: SxProps
};

export function DeleteButton({ sx, ...other }: DeleteButtonProps) {
  return (
    <IconButton
      size="small"
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.72),
        '&:hover': { bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.48) },
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );
}
