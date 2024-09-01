import { CloundinaryImage } from './CloudinaryImage'
import Image from 'next/image'

export const ReporterInfo = ({
  name,
  image,
  publicId,
}: {
  name: string
  image?: string | null
  publicId?: string | null
}) => {
  return (
    <div className="flex gap-2 items-center mt-8">
      {publicId ? (
        <CloundinaryImage
          className="w-12 h-12 rounded-full"
          publicId={publicId || ''}
        />
      ) : (
        <Image
          className="w-12 h-12 rounded-full"
          src={image || '/images/user.jpg'}
          width={200}
          height={200}
          alt=""
        />
      )}
      <div className="text-zinc-600">
        <div className="text-xs">Written by,</div>
        <div>{name}</div>
      </div>
    </div>
  )
}
