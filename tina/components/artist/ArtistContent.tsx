import React, { useEffect, useState } from "react"
import type {
  ArtistQuery,
  ArtistQueryVariables,
} from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

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

  console.log("🔥 artist description: ", profileDescription)

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
            className="space-y-3"
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
        <div className="relative h-full w-full">
          {/* Images */}
          <div
            className="carousel-container relative h-full w-full"
            data-tina-field={tinaField(artist, "profileImageUrlList")}
          >
            {(profileImageUrlList || []).map((image, index) => (
              <img
                key={`${_sys.filename}-carousel-image-${index}`}
                src={image?.imageUrl || ""}
                alt={image?.alt || ""}
                className={`carousel-image absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
                data-index={index}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          {(profileImageUrlList?.length || 0) > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="carousel-btn absolute top-1/2 left-6 -translate-y-1/2 transform rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
                aria-label="Image précédente"
              >
                <svg
                  className="h-4 w-4 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="carousel-btn absolute top-1/2 right-6 -translate-y-1/2 transform rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
                aria-label="Image suivante"
              >
                <svg
                  className="h-4 w-4 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image navigation dots (if multiple images) */}
          {(profileImageUrlList?.length || 0) > 1 && (
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform space-x-3">
              {(profileImageUrlList || []).map((_, index) => (
                <button
                  key={`${_sys.filename}-dot-${index}`}
                  onClick={() => goToImage(index)}
                  className={`carousel-dot h-3 w-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  data-index={index}
                  aria-label={`Image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
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
              className="flex-1 space-y-4 overflow-y-auto"
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
