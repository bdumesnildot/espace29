import React, { useEffect, useState } from "react"
import type { EventQuery, EventQueryVariables } from "@tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { formatDate } from "@lib/formatter/date-helpers"
import { Carousel } from "../ui/Carousel"

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
        <Carousel
          imageList={(imageUrlList || []).map((image) => ({
            url: image?.imageUrl || "",
            alt: image?.alt || "",
          }))}
        />
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
