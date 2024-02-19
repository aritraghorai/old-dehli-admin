import theme from '@/theme'
import { Stack, styled } from '@mui/material'

export const StyledContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  alignSelf: 'stretch',
  width: '100%',
  height: '100vh',
  backgroundColor: theme.palette.structural.STRUCTURAL_WHITE,
})
export const StyledLogo = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  height: theme.spacing(14),
  padding: `${theme.spacing(2.5)} ${theme.spacing(5)}`,
  alignItems: 'center',
  gap: theme.spacing(2.5),
  alignSelf: 'stretch',
})
export const StyledProgressBox = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.spacing(0)} ${theme.spacing(8)}`,
  alignItems: 'center',
  gap: theme.spacing(2.5),
  alignSelf: 'stretch',
})
export const StyledElements = styled(Stack)({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: theme.spacing(3),
  alignSelf: 'stretch',
})
export const StyledMainItems = styled(Stack)({
  display: 'flex',
  width: '100%',
  padding: theme.spacing(4),
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
})
export const StyledNavItem = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  width: theme.spacing(40),
  padding: theme.spacing(4),
  alignItems: 'center',
  gap: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.structural.STRUCTURAL_100,
    cursor: 'pointer',
    borderRadius: theme.spacing(1),
  },
  '&.active': {
    backgroundColor: theme.palette.structural.STRUCTURAL_100,
    borderRadius: theme.spacing(1),
  },
})
export const StyledDefinitions = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})
export const StyledDivider = styled(Stack)({
  display: 'flex',
  width: '100%',
})
export const StyledAccordion = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  '& .MmuiPaper-root-MuiAccordion-root': {
    width: '100%',
  },
})
export const StyledTypography = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: theme.spacing(4),
  alignItems: 'center',
  gap: theme.spacing(2),
})

