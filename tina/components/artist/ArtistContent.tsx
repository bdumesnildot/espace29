import type {
  ArtistQuery,
  ArtistQueryVariables,
} from "@tina/__generated__/types"
import React, { useEffect, useState } from "react"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Carousel } from "../ui/Carousel"

type ArtistContentProps = {
  variables: ArtistQueryVariables
  data: ArtistQuery
  query: string
}

export const ArtistContent: React.FC<ArtistContentProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const artist = data.artist
  const {
    title,
    websiteUrl,
    email,
    profileDescription,
    profileImageUrlList,
    _sys,
  } = artist

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle carousel navigation
  const goToImage = (index: number) => {
    const totalImages = profileImageUrlList?.length || 0
    setCurrentImageIndex((index + totalImages) % totalImages)
  }

  const handlePrev = () => {
    goToImage(currentImageIndex - 1)
  }

  const handleNext = () => {
    goToImage(currentImageIndex + 1)
  }

  // Reset index when images change
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [profileImageUrlList?.length])

  return (
    <section className="flex w-full flex-col sm:h-screen sm:flex-row">
      {/* Mobile: Artist Details First */}
      <div className="flex w-full flex-col sm:hidden">
        {/* Title / Specialty */}
        <hr className="w-full border-t border-black" />
        <p
          className="font-eina04 px-4 py-4 text-xl text-gray-900"
          data-tina-field={tinaField(artist, "title")}
        >
          {title}
        </p>
        <hr className="w-full border-t border-black" />

        {/* Website + Email */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-4">
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-eina04 text-base text-gray-700 underline underline-offset-2 transition-colors duration-200 hover:text-gray-900"
              data-tina-field={tinaField(artist, "websiteUrl")}
            >
              {websiteUrl}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="font-eina04 text-base text-gray-700 underline underline-offset-2 transition-colors duration-200 hover:text-gray-900"
              data-tina-field={tinaField(artist, "email")}
            >
              {email}
            </a>
          )}
        </div>
        <hr className="w-full border-t border-black" />

        {/* Description */}
        <div
          className="markdown-content px-4 py-4"
          data-tina-field={tinaField(artist, "profileDescription")}
        >
          <TinaMarkdown content={profileDescription as any} />
        </div>
      </div>

      {/* Mobile: Images */}
      <div className="w-full bg-gray-50 p-4 sm:hidden">
        <div
          className="flex flex-col items-center gap-4"
          data-tina-field={tinaField(artist, "profileImageUrlList")}
        >
          {(profileImageUrlList || []).map((image, index) => (
            <img
              key={`${_sys.filename}-mobile-image-${index}`}
              src={image?.imageUrl || ""}
              alt={image?.alt || ""}
              className="h-[400px] w-full object-cover shadow-sm"
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Image Carousel */}
      <div className="relative hidden flex-1 overflow-hidden bg-gray-50 sm:flex">
        <Carousel
          imageList={(profileImageUrlList || []).map((image) => ({
            url: image?.imageUrl || "",
            alt: image?.alt || "",
          }))}
        />
      </div>

      {/* Desktop: Artist Details */}
      <div className="hidden h-full flex-1 flex-col sm:flex">
        <hr className="w-full border-t border-black" />
        <div className="flex h-full flex-col">
          {/* Title / Specialty */}
          <p
            className="font-eina04 px-8 py-6 text-4xl text-gray-900"
            data-tina-field={tinaField(artist, "title")}
          >
            {title}
          </p>
          <hr className="w-full border-t border-black" />

          {/* Website + Email */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-1 px-8 py-6">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-eina04 text-xl text-gray-700 underline underline-offset-2 transition-colors duration-200 hover:text-gray-900"
                data-tina-field={tinaField(artist, "websiteUrl")}
              >
                {websiteUrl}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="font-eina04 text-xl text-gray-700 underline underline-offset-2 transition-colors duration-200 hover:text-gray-900"
                data-tina-field={tinaField(artist, "email")}
              >
                {email}
              </a>
            )}
          </div>
          <hr className="w-full border-t border-black" />

          {/* Description */}
          <div
            className="markdown-content flex-1 overflow-y-auto px-8 py-6"
            data-tina-field={tinaField(artist, "profileDescription")}
          >
            <TinaMarkdown content={profileDescription as any} />
          </div>
        </div>
      </div>
    </section>
  )
}
