import { formatDate } from "@lib/formatter/date-helpers"
import type { EventQuery, EventQueryVariables } from "@tina/__generated__/types"
import React, { useEffect, useState } from "react"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
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
      <div className="flex w-full flex-col md:hidden">
        {/* Event Title */}
        <hr className="w-full border-t border-black" />
        <p
          className="font-eina04 px-4 py-4 text-xl text-gray-900"
          data-tina-field={tinaField(event, "title")}
        >
          {event.title}
        </p>
        <hr className="w-full border-t border-black" />

        {/* Event Date */}
        <p className="font-eina04 flex items-center gap-2 px-4 py-4 text-base text-gray-700">
          <span data-tina-field={tinaField(event, "dateStart")}>
            {formatDate(dateStart)}
          </span>
          {dateEnd && (
            <>
              <span>-</span>
              <span data-tina-field={tinaField(event, "dateEnd")}>
                {formatDate(dateEnd)}
              </span>
            </>
          )}
        </p>
        <hr className="w-full border-t border-black" />

        {/* Description */}
        <div
          className="markdown-content px-4 py-4"
          data-tina-field={tinaField(event, "description")}
        >
          <TinaMarkdown content={description as any} />
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
        <hr className="w-full border-t border-black" />
        <div className="flex h-full flex-col">
          {/* Event Title */}
          <p
            className="font-eina04 px-8 py-6 text-4xl text-gray-900"
            data-tina-field={tinaField(event, "title")}
          >
            {event.title}
          </p>
          <hr className="w-full border-t border-black" />

          {/* Event Date */}
          <p className="font-eina04 flex items-center gap-2 px-8 py-6 text-xl text-gray-700">
            <span data-tina-field={tinaField(event, "dateStart")}>
              {formatDate(dateStart)}
            </span>
            {dateEnd && (
              <>
                <span>-</span>
                <span data-tina-field={tinaField(event, "dateEnd")}>
                  {formatDate(dateEnd)}
                </span>
              </>
            )}
          </p>
          <hr className="w-full border-t border-black" />

          {/* Description */}
          <div
            className="markdown-content flex-1 overflow-y-auto px-8 py-6"
            data-tina-field={tinaField(event, "description")}
          >
            <TinaMarkdown content={description as any} />
          </div>
        </div>
      </div>
    </section>
  )
}
