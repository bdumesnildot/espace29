import React from "react"
import { classMerge } from "@styles/utils"
import { tinaField, useTina } from "tinacms/dist/react"
import type { EventQuery, EventQueryVariables } from "@tina/__generated__/types"
import { formatDate } from "@lib/formatter/date-helpers"
import { TinaMarkdown } from "tinacms/dist/rich-text"

type EventCardProps = {
  variables: EventQueryVariables
  data: EventQuery
  query: string
  className?: string
  grayscale?: "always" | "untilHover" | "false"
  href?: string
  onClick?: string
}

export const EventCard: React.FC<EventCardProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const event = data.event

  const { className, grayscale = "false", href, onClick } = props
  const {
    title,
    dateStart,
    dateEnd,
    cardImageUrl,
    cardImageAlt,
    cardDescription,
  } = event
  const Component = href ? "a" : "div"
  const isInteractive = href || onClick

  // Base classes following design system philosophy
  const baseClasses =
    "bg-transparent border border-black overflow-hidden transition-all duration-300 h-full flex flex-col w-full"
  const interactiveClasses = isInteractive ? "cursor-pointer" : ""
  const grayscaleClasses = (() => {
    if (grayscale === "always") return "filter grayscale"
    if (grayscale === "untilHover") return "filter grayscale hover:grayscale-0"
    return ""
  })()

  return (
    <Component
      className={classMerge(
        baseClasses,
        interactiveClasses,
        grayscaleClasses,
        className
      )}
      href={href}
      onClick={
        onClick
          ? (e) => {
              try {
                new Function("event", onClick)(e)
              } catch (err) {
                console.error("Error executing onClick:", err)
              }
            }
          : undefined
      }
    >
      <div className="border-b border-black px-4 py-3">
        <h3
          className="font-eina03 line-clamp-1 text-2xl font-normal text-gray-900"
          data-tina-field={tinaField(event, "title")}
        >
          {title}
        </h3>
      </div>

      <div className="border-b border-black px-4 py-2">
        <p className="font-eina03 flex items-center gap-2 text-xl text-gray-700">
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
      </div>

      {cardImageUrl && (
        <div className="min-h-0 flex-1 overflow-hidden">
          <img
            src={cardImageUrl}
            alt={cardImageAlt || ""}
            className="h-full w-full object-cover transition-all duration-300"
            loading="lazy"
          />
        </div>
      )}
    </Component>
  )
}
