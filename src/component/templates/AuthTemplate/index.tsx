import { Stack } from '@mui/material'
import Login from '@/assets/images/login.svg'
import theme from '@/theme'
import { PropsWithChildren } from 'react'
import Image from '@/component/atoms/Image'

const AuthTemplate = ({ children }: PropsWithChildren) => {
  return (
    <Stack direction="row" height="100vh" width="100vw">
      <Stack width="50%">
        <Image
          src={Login}
          alt="Login Image"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Stack>
      <Stack alignItems="center" justifyContent="center" flex={1}>
        <Stack width={theme.spacing(103.25)}>{children}</Stack>
      </Stack>
    </Stack>
  )
}

export default AuthTemplate

