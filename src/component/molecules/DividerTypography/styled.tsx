import { Divider, dividerClasses, styled } from '@mui/material'
import theme from '@/theme'

export const StyledDivider = styled(Divider)({
  ['&::after,&::before']: {
    background: theme.palette.stroke.STROKE_100,
  },
  [`.${dividerClasses.wrapper}`]: {
    padding: `0 ${theme.spacing(6)} 0 ${theme.spacing(6)}`,
  },
})

