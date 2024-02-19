import React, { memo } from 'react'
import { StyledDivider } from './styled'
import theme from '@/theme'
import { Typography } from '@mui/material'

interface DividerTypographyProps {
  label?: string
}

const DividerTypography = memo(({ label }: DividerTypographyProps) => {
  if (!label) {
    return <StyledDivider data-testid="divider" />
  }
  return (
    <StyledDivider>
      <Typography color={theme.palette.text.lowEmphasis} variant="overline2">
        {label}
      </Typography>
    </StyledDivider>
  )
})
DividerTypography.displayName = 'DividerTypography'
export default DividerTypography

