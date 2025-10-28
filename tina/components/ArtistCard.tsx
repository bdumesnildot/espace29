import React from "react"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { classMerge } from "../../src/styles/utils"

export interface ArtistCardProps {
  title: string
  subtitle?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  href?: string
  className?: string
  grayscale?: "always" | "untilHover" | "false"
  onClick?: string
  id?: string
  // Tina visual editing props
  tinaFieldProps?: {
    title?: any
    subtitle?: any
    description?: any
    imageUrl?: any
    imageAlt?: any
  }
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt = "",
  href,
  className = "",
  grayscale = "false",
  onClick,
  id,
  tinaFieldProps,
}) => {
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
      id={id}
    >
      {imageUrl && (
        <div className="flex-3">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-all duration-300"
            loading="lazy"
            {...(tinaFieldProps?.imageUrl && {
              "data-tina-field": tinaFieldProps.imageUrl,
            })}
          />
        </div>
      )}

      <div className="flex-1 border-t border-gray-700 bg-gray-50 p-6">
        <h3
          className="font-eina03 mb-3 text-2xl font-semibold text-gray-900"
          {...(tinaFieldProps?.title && {
            "data-tina-field": tinaFieldProps.title,
          })}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className="font-eina03 mb-2 text-xl font-medium text-gray-700"
            {...(tinaFieldProps?.subtitle && {
              "data-tina-field": tinaFieldProps.subtitle,
            })}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p
            className="font-eina03 line-clamp-6 text-lg leading-relaxed text-gray-700"
            {...(tinaFieldProps?.description && {
              "data-tina-field": tinaFieldProps.description,
            })}
          >
            {description}
          </p>
        )}
      </div>
    </Component>
  )
}

export const ArtistCardTemplate: Template = {
  name: "ArtistCard",
  label: "Artist Card",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      required: true,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "string",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "string",
      required: false,
      ui: {
        component: "textarea",
      },
    },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "string",
      required: false,
    },
    {
      name: "imageAlt",
      label: "Image Alt Text",
      type: "string",
      required: false,
    },
    {
      name: "href",
      label: "Link URL",
      type: "string",
      required: false,
    },
    {
      name: "grayscale",
      label: "Grayscale Effect",
      type: "string",
      options: [
        { label: "None", value: "false" },
        { label: "Always", value: "always" },
        { label: "Until Hover", value: "untilHover" },
      ],
      required: false,
    },
  ],
}
