import React, { useState, useEffect } from "react"
import type { CollectionEntry } from "astro:content"
import type {
  ArtistQuery,
  ArtistQueryVariables,
} from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"

type ArtistContentProps = {
  artist: CollectionEntry<"artist">["data"]
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

  const {
    title,
    websiteUrl,
    email,
    profileDescription,
    profileImageUrlList,
    tinaInfo,
  } = props.artist

  // const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = (profileImageUrlList?.length || 0) > 1

  // Initialize carousel and scroll effects
  useEffect(() => {
    if (!hasMultipleImages) return

    // Carousel functionality
    const images = document.querySelectorAll(
      ".carousel-image"
    ) as NodeListOf<HTMLImageElement>
    const dots = document.querySelectorAll(
      ".carousel-dot"
    ) as NodeListOf<HTMLButtonElement>

    const updateCarousel = (index: number) => {
      // Update images visibility
      images.forEach((img, i) => {
        img.classList.toggle("opacity-100", i === index)
        img.classList.toggle("opacity-0", i !== index)
      })

      // Update dots styling
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.remove("bg-white/50", "hover:bg-white/75")
          dot.classList.add("bg-white")
        } else {
          dot.classList.remove("bg-white")
          dot.classList.add("bg-white/50", "hover:bg-white/75")
        }
      })
    }

    // Create stable dot click handlers
    const dotClickHandlers = Array.from(dots).map((_, index) => {
      return () => updateCarousel(index)
    })

    dots.forEach((dot, index) => {
      dot.addEventListener("click", dotClickHandlers[index])
    })

    // Cleanup event listeners
    return () => {
      dots.forEach((dot, index) => {
        dot.removeEventListener("click", dotClickHandlers[index])
      })
    }
  }, [hasMultipleImages])

  return (
    <section
      id={`artist-${tinaInfo.filename}-details-section`}
      className="flex w-full flex-col sm:h-screen sm:flex-row"
    >
      {/* Mobile: Artist Details First */}
      <div className="flex w-full flex-col space-y-4 p-4 sm:hidden">
        {/* Artist Title */}
        <div className="border-b border-gray-400 pb-4">
          <h2 className="font-eina02 text-2xl font-semibold text-gray-900">
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
          <div className="space-y-3">
            {profileDescription.split("\n\n").map((paragraph, index) => (
              <p
                key={`${tinaInfo.filename}-mobile-para-${index}`}
                className="font-eina03 text-sm leading-relaxed text-gray-700"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Images */}
      <div className="w-full bg-gray-50 p-4 sm:hidden">
        <div className="flex flex-col items-center gap-4">
          {(profileImageUrlList || []).map((image, index) => (
            <img
              key={`${tinaInfo.filename}-mobile-image-${index}`}
              src={image.imageUrl}
              alt={image.alt}
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
          <div className="carousel-container relative h-full w-full">
            {(profileImageUrlList || []).map((image, index) => (
              <img
                key={`${tinaInfo.filename}-carousel-image-${index}`}
                src={image.imageUrl}
                alt={image.alt}
                className={`carousel-image absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === 0 ? "opacity-100" : "opacity-0"
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
                id="prev-btn"
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
                id="next-btn"
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
                  key={`${tinaInfo.filename}-dot-${index}`}
                  className={`carousel-dot h-3 w-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none ${
                    index === 0 ? "bg-white" : "bg-white/50 hover:bg-white/75"
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
            <h2 className="font-eina02 text-4xl font-semibold text-gray-900">
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
            <div className="flex-1 space-y-4 overflow-y-auto">
              {profileDescription.split("\n\n").map((paragraph, index) => (
                <p
                  key={`${tinaInfo.filename}-desktop-para-${index}`}
                  className="font-eina03 text-lg leading-relaxed text-gray-700"
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
