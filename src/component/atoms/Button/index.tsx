import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode
  variant?: MuiButtonProps['variant']
  color?: MuiButtonProps['color']
  fullWidth?: MuiButtonProps['fullWidth']
  size?: MuiButtonProps['size']
  onClick?: MuiButtonProps['onClick']
}

const Button = ({ children, variant = 'contained', ...props }: ButtonProps) => {
  return (
    <MuiButton variant={variant} {...props}>
      {children}
    </MuiButton>
  )
}

export default Button

