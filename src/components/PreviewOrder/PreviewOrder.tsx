import { NextComponentType } from 'next'
import React from 'react'

interface PropsInterface {
  price: number;
  quantity: number;
}

const PreviewOrder: NextComponentType<any, any, PropsInterface> = () => {
  return (
    <div>PreviewOrder</div>
  )
}

export default PreviewOrder