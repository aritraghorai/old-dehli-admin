import React from 'react'

interface IImageProps {
  src: string
  alt: string
  width?: string
  height?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Image = ({ src, alt, width, height, style, ...props }: IImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      height={height}
      width={width}
      {...props}
    />
  )
}

export default Image

