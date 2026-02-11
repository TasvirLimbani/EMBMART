"use client"

import Image from "next/image"
import { useState } from "react"

interface SafeImageProps {
    src: string
    alt: string
    className?: string
}

export function SafeImage({ src, alt, className }: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src)

    return (
        <Image
            src={'http://embmart.soon.it/' + imgSrc.trim()}
            alt={alt}
            fill
            className={className}
            onError={() => {
                setImgSrc("/images/category-small-machines.jpg") // fallback image
            }}
        />
    )
}
