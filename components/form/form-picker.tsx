import { defaultImages } from "@/constants/images"
import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"
import { Check, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import FormErrors from "./form-errors"

interface IFormPickerProps {
  id: string,
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({
  id,
  errors
}: IFormPickerProps) => {

  const {pending} = useFormStatus()

  const [images, setImages] = useState<Record<string, any>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9
        })
        if (result && result.response) {
          setImages(result.response as Record<string, any>[])
        } else {
          console.log('Failed to get unsplash images')
        }
      } catch (error) {
        console.log(error)
        setImages([...defaultImages])
      } finally {
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [])

  if (isLoading) return (
    <div className="p-6 flex items-center justify-center">
      <Loader2
        className="w-6 h-6 text-blue-500 animate-spin"
      />
    </div>
  )

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map(image => (
          <div
            key={image.id}
            onClick={() => {
              if (pending) return
              setSelectedImage(image.id)
            }}
            className={cn(
              "relative cursor-pointer group bg-muted hover:opacity-75 transition-all aspect-video",
              {'opacity-50 hover:opacity-50 cursor-auto': pending}
            )}
          >
            <input 
              type="radio"
              name={id}
              id={id}
              className="hidden"
              checked={selectedImage === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            {selectedImage === image.id && (
              <div
                className="absolute z-10 w-full h-full bg-black/50 flex items-center justify-center"
              >
                <Check className="w-6 h-6 text-white"/>
              </div>
            )}
            <Image
              className="rounded-sm object-cover"
              fill
              src={image.urls.thumb}
              alt="Unsplash image"
            />

            <Link
              href={image.links.html}
              target="blank"
              className="absolute z-20 hover:underline bottom-0 opacity-0 group-hover:opacity-100 w-full bg-black/50 truncate p-1 text-white text-[10px]"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors
        id={id}
        errors={errors}
      />
    </div>
  )
}