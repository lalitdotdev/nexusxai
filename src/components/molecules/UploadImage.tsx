'use client'

import { CldImage, CldUploadButton } from 'next-cloudinary'

import { toast } from 'sonner'

export const UploadImage = ({
    setValue,
    imagePublicId,
}: {
    setValue: (publicId: string) => void
    imagePublicId?: string | null
}) => {
    if (imagePublicId) {
        return (
            <CldImage
                className="rounded-lg shadow-lg border-2 border-white"
                width={500}
                height={500}
                src={imagePublicId}
                alt=""
            />
        )
    }
    return (
        <CldUploadButton
            uploadPreset="ml_default"
            onSuccess={({ event, info }) => {
                if (typeof info === 'object' && 'public_id' in info) {
                    const { public_id } = info
                    setValue(public_id)
                    toast.success('Image uploaded successfully')
                } else {
                    console.error('Invalid info object:', info)
                }
            }}
        />
    )
}
