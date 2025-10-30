import React from "react"
import { classMerge } from "@styles/utils"
import { tinaField, useTina } from "tinacms/dist/react"
import type {
  ArtistQuery,
  ArtistQueryVariables,
} from "@tina/__generated__/types"
import { TinaMarkdown } from "tinacms/dist/rich-text"

type ArtistCardProps = {
  variables: ArtistQueryVariables
  data: ArtistQuery
  query: string
  className?: string
  grayscale?: "always" | "untilHover" | "false"
  href?: string
  onClick?: string
}

export const ArtistCard: React.FC<ArtistCardProps> = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const artist = data.artist

  const { className, grayscale = "false", href, onClick } = props
  const {
    firstName,
    lastName,
    title: cardSubtitle,
    cardImageUrl,
    cardImageAlt,
    cardDescription,
  } = artist
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
        <div className="flex-3">
          <img
            src={cardImageUrl}
            alt={cardImageAlt || ""}
            className="h-full w-full object-cover transition-all duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1 border-t border-gray-700 bg-gray-50 p-6">
        <h3 className="font-eina03 mb-3 text-2xl font-semibold text-gray-900">
          <div className="flex items-center justify-start gap-2">
            {firstName && (
              <span data-tina-field={tinaField(artist, "firstName")}>
                {firstName}
              </span>
            )}
            <span data-tina-field={tinaField(artist, "lastName")}>
              {lastName}
            </span>
          </div>
        </h3>
        {cardSubtitle && (
          <p
            className="font-eina03 mb-2 text-xl font-medium text-gray-700"
            data-tina-field={tinaField(artist, "title")}
          >
            {cardSubtitle}
          </p>
        )}
        {cardDescription && (
          <p
            className="font-eina03 line-clamp-6 text-lg leading-relaxed text-gray-700"
            data-tina-field={tinaField(artist, "cardDescription")}
          >
            <TinaMarkdown content={cardDescription as any} />
          </p>
        )}
      </div>
    </Component>
  )
}
