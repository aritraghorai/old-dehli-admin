import theme from '@/theme'
import { Avatar, Box, Popover, Stack, styled } from '@mui/material'

export const StyledAvatar = styled(Avatar)({
  backgroundColor: theme.palette.avatar.AVATAR_PINK,
  height: theme.spacing(8),
  width: theme.spacing(8),
  cursor: 'pointer',
})

export const TextContainer = styled(Stack)({
  paddingRight: theme.spacing(3),
})

export const LogoutContainer = styled(Stack)({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  cursor: 'pointer',
})

export const StyledBox = styled(Box)({
  height: theme.spacing(10),
  width: theme.spacing(10),
})

export const StyledContainer = styled(Stack)({
  padding: `${theme.spacing(6)} ${theme.spacing(3)}`,
  gap: theme.spacing(4.5),
  borderRadius: theme.spacing(1),
  border: `${theme.spacing(0.25)} solid  ${theme.palette.stroke.STROKE_100}`,
  background: theme.palette.text.light,
  boxShadow: `${theme.spacing(0)}${theme.spacing(0)}${theme.spacing(
    1.5
  )}${theme.spacing(0.75)}`,
})

export const StyledPopOver = styled(Popover)({
  '& .MuiPopover-paper': {
    marginTop: theme.spacing(1),
  },
})

