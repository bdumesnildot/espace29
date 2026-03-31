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
        <h3 className="font-eina03 line-clamp-1 text-2xl font-normal text-gray-900">
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
      </div>

      <div className="border-b border-black px-4 py-2">
        {cardSubtitle && (
          <p
            className="font-eina03 text-xl text-gray-700"
            data-tina-field={tinaField(artist, "title")}
          >
            {cardSubtitle}
          </p>
        )}
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
