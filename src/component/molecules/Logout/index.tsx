import { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import theme from '@/theme'
import IconTypography from '../IconTypography'
import DividerTypography from '../DividerTypography'
import {
  LogoutContainer,
  StyledAvatar,
  StyledBox,
  StyledContainer,
  StyledPopOver,
  TextContainer,
} from './styled'
import LogoutIcon from '@/assets/icons/logout.svg'

interface LogoutProps {
  username: string
  email: string
  handleLogout?: () => void
}
const Logout = ({ username, email, handleLogout }: LogoutProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <StyledAvatar onClick={handleClick}>{username.charAt(0)}</StyledAvatar>
      <StyledPopOver
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledContainer>
          <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
            <StyledBox>
              <StyledAvatar>{username.charAt(0)}</StyledAvatar>
            </StyledBox>
            <TextContainer direction="column">
              <Typography
                variant="body2"
                color={theme.palette.text.highEmphasis}
              >
                {username}
              </Typography>
              <Typography
                variant="caption2"
                color={theme.palette.text.mediumEmphasis}
              >
                {email}
              </Typography>
            </TextContainer>
          </Stack>
          <DividerTypography />
          <LogoutContainer onClick={handleLogout}>
            <IconTypography
              iconSrc={LogoutIcon}
              label="Logout"
              labelColor={theme.palette.text.mediumEmphasis}
              variant="body2"
              gap={theme.spacing(5)}
            />
          </LogoutContainer>
        </StyledContainer>
      </StyledPopOver>
    </>
  )
}

export default Logout

