import { CircularProgress, useTheme } from "@mui/material";

export const Loading = ({style, color, size}) => {
  const theme = useTheme()
  return (
    <CircularProgress
        variant="indeterminate"
        sx={{
          color: color || theme.palette.primary.contrastText,
          ...style
        }}
        size={size||25}
        thickness={3}
        value={100}
      />
  )
      }