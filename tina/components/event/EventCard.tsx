import React from "react"
import { classMerge } from "@styles/utils"
import { tinaField, useTina } from "tinacms/dist/react"
import type { EventQuery, EventQueryVariables } from "@tina/__generated__/types"
import { formatDate, formatDateRange } from "@lib/date-helpers"
import { date } from "astro:schema"
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
    "bg-transparent border border-gray-700 shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col w-full"
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
      {cardImageUrl && (
        <div className="min-h-0 flex-3 overflow-hidden">
          <img
            src={cardImageUrl}
            alt={cardImageAlt || ""}
            className="h-full w-full object-cover transition-all duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-gray-700 bg-gray-50 p-6">
        <h3
          className="font-eina03 mb-3 text-2xl font-semibold text-gray-900"
          data-tina-field={tinaField(event, "title")}
        >
          {title}
        </h3>
        <p className="font-eina03 mb-2 flex items-center justify-start gap-2 text-xl font-medium text-gray-700">
          <span data-tina-field={tinaField(event, "dateStart")}>
            {formatDate(dateStart)}
          </span>
          {dateEnd && <span>{"-"}</span>}
          {dateEnd && (
            <span data-tina-field={tinaField(event, "dateEnd")}>
              {formatDate(dateEnd)}
            </span>
          )}
        </p>
        {cardDescription && (
          <p
            className="font-eina03 min-h-0 overflow-y-hidden text-lg leading-relaxed text-gray-700"
            data-tina-field={tinaField(event, "cardDescription")}
          >
            <TinaMarkdown content={cardDescription as any} />
          </p>
        )}
      </div>
    </Component>
  )
}
