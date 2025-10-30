import React, { useEffect, useState } from "react"
import type {
  ArtistQuery,
  ArtistQueryVariables,
} from "@tina/__generated__/types"
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
      <div className="flex w-full flex-col space-y-4 p-4 sm:hidden">
        {/* Artist Title */}
        <div className="border-b border-gray-400 pb-4">
          <h2
            className="font-eina02 text-2xl font-semibold text-gray-900"
            data-tina-field={tinaField(artist, "title")}
          >
            {title}
          </h2>
        </div>

        {/* Website Link */}
        {websiteUrl && (
          <div className="border-b border-gray-400 pb-4">
            <h3 className="font-eina04 mb-2 text-base font-semibold text-gray-900">
              Site Web
            </h3>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-eina03 border-b border-transparent text-sm text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:text-gray-900"
              data-tina-field={tinaField(artist, "websiteUrl")}
            >
              {websiteUrl}
            </a>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="border-b border-gray-400 pb-4">
            <h3 className="font-eina04 mb-2 text-base font-semibold text-gray-900">
              Contact
            </h3>
            <a
              href={`mailto:${email}`}
              className="font-eina03 border-b border-transparent text-sm text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:text-gray-900"
              data-tina-field={tinaField(artist, "email")}
            >
              {email}
            </a>
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="font-eina04 mb-3 text-base font-semibold text-gray-900">
            À propos
          </h3>
          <div
            className="markdown-content space-y-3"
            data-tina-field={tinaField(artist, "profileDescription")}
          >
            <TinaMarkdown content={profileDescription as any} />
          </div>
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
        <div className="flex h-full flex-col space-y-8 p-8 pt-12">
          {/* Artist Title */}
          <div className="border-b border-gray-400 pb-6">
            <h2
              className="font-eina02 text-4xl font-semibold text-gray-900"
              data-tina-field={tinaField(artist, "title")}
            >
              {title}
            </h2>
          </div>

          {/* Website Link */}
          {websiteUrl && (
            <div className="border-b border-gray-400 pb-6">
              <h3 className="font-eina04 mb-3 text-lg font-semibold text-gray-900">
                Site Web
              </h3>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-eina03 border-b border-transparent text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:text-gray-900"
                data-tina-field={tinaField(artist, "websiteUrl")}
              >
                {websiteUrl}
              </a>
            </div>
          )}

          {/* Email */}
          {email && (
            <div className="border-b border-gray-400 pb-6">
              <h3 className="font-eina04 mb-3 text-lg font-semibold text-gray-900">
                Contact
              </h3>
              <a
                href={`mailto:${email}`}
                className="font-eina03 border-b border-transparent text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:text-gray-900"
                data-tina-field={tinaField(artist, "email")}
              >
                {email}
              </a>
            </div>
          )}

          {/* Description */}
          <div className="flex flex-1 flex-col">
            <h3 className="font-eina04 mb-4 text-lg font-semibold text-gray-900">
              À propos
            </h3>
            <div
              className="markdown-content flex-1 space-y-4 overflow-y-auto"
              data-tina-field={tinaField(artist, "profileDescription")}
            >
              <TinaMarkdown content={profileDescription as any} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
