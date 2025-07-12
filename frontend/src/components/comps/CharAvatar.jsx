import { getInitials } from '@/lib/helper'
import React from 'react'

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div className={`${width || "w-12"} ${height || "h-12"} ${style || ""} flex items-center justify-center rounded-full text-green-950 font-medium bg-green-100/90`}>
        {getInitials(fullName || '')}
    </div>
  )
}

export default CharAvatar