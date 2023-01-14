import { NextComponentType } from 'next'
import Image from 'next/future/image'
import React from 'react'

interface PropsInterface {
  src: string;
  alt: string;
}

const HeaderImage: NextComponentType<any, any, PropsInterface> = ({ src, alt }) => {
  return (
    <div
      className="relative h-72 w-full overflow-hidden"
    > 
      <Image src={src} alt={alt} style={{"objectFit": "cover"}} fill />
    </div>
  )
}

export default HeaderImage