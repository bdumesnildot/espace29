import React, { useEffect, useState } from "react"
import type { EventQuery, EventQueryVariables } from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { formatDate } from "@lib/date-helpers"

type EventContentProps = {
  variables: EventQueryVariables
  data: EventQuery
  query: string
}

export const EventContent: React.FC<EventContentProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const event = data.event
  const { dateStart, dateEnd, description, imageUrlList, _sys } = event

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle carousel navigation
  const goToImage = (index: number) => {
    const totalImages = imageUrlList?.length || 0
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
  }, [imageUrlList?.length])

  return (
    <section className="flex w-full flex-col md:h-screen md:flex-row">
      {/* Mobile: Event Details First */}
      <div className="flex w-full flex-col space-y-4 p-4 md:hidden">
        {/* Event Date */}
        <div className="border-b border-gray-400 pb-4">
          <h2 className="font-eina02 flex items-center justify-start gap-2 text-2xl font-semibold text-gray-900">
            <span data-tina-field={tinaField(event, "dateStart")}>
              {formatDate(dateStart)}
            </span>
            {dateEnd && <span>{"-"}</span>}
            {dateEnd && (
              <span data-tina-field={tinaField(event, "dateEnd")}>
                {formatDate(dateEnd)}
              </span>
            )}
          </h2>
        </div>

        {/* Description */}
        <div className="border-gray-400 pb-4">
          {/* <h3 className="font-eina04 mb-3 text-base font-semibold text-gray-900">
            Description
          </h3> */}
          <div
            className="markdown-content space-y-3"
            data-tina-field={tinaField(event, "description")}
          >
            <TinaMarkdown content={description as any} />
          </div>
        </div>
      </div>

      {/* Mobile: Images Grid */}
      <div className="w-full bg-gray-50 p-4 md:hidden">
        <div className="flex flex-col items-center gap-4">
          {(imageUrlList || []).map((image, index) => (
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
      <div className="relative hidden flex-1 overflow-hidden bg-gray-50 md:flex">
        <div className="relative h-full w-full">
          {/* Images */}
          <div className="carousel-container relative h-full w-full">
            {(imageUrlList || []).map((image, index) => (
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
          {(imageUrlList?.length || 0) > 1 && (
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
          {(imageUrlList?.length || 0) > 1 && (
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform space-x-3">
              {(imageUrlList || []).map((_, index) => (
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

      {/* Desktop: Event Details */}
      <div className="hidden h-full flex-1 flex-col md:flex">
        <div className="flex h-full flex-col space-y-8 p-8 pt-12">
          {/* Event Date */}
          <div className="border-b border-gray-400 pb-6">
            <h2 className="font-eina02 flex items-center justify-start gap-2 text-4xl font-semibold text-gray-900">
              <span data-tina-field={tinaField(event, "dateStart")}>
                {formatDate(dateStart)}
              </span>
              {dateEnd && <span>{"-"}</span>}
              {dateEnd && (
                <span data-tina-field={tinaField(event, "dateEnd")}>
                  {formatDate(dateEnd)}
                </span>
              )}
            </h2>
          </div>

          {/* Description */}
          <div className="flex flex-1 flex-col">
            {/* <h3 className="font-eina04 mb-4 text-lg font-semibold text-gray-900">
              Description
            </h3> */}
            <div
              className="markdown-content flex-1 space-y-4 overflow-y-auto"
              data-tina-field={tinaField(event, "description")}
            >
              <TinaMarkdown content={description as any} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
