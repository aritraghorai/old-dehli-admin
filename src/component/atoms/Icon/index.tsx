import React, { memo } from 'react'
export interface IIconProps {
  src: string
  alt: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
}
const Icon = memo(({ src, alt, style, ...props }: IIconProps) => {
  return <img src={src} alt={alt} style={style} {...props} />
})
Icon.displayName = 'Icon'
export default Icon

