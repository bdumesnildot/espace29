import React, { useEffect, useState } from "react"

type CarouselProps = {
  imageList: {
    url: string
    alt?: string
  }[]
}

export const Carousel: React.FC<CarouselProps> = (props) => {
  const { imageList } = props
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle carousel navigation
  const goToImage = (index: number) => {
    const totalImages = imageList?.length || 0
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
  }, [imageList?.length])

  return (
    <div className="relative h-full w-full">
      {/* Images */}
      <div className="carousel-container relative h-full w-full">
        {(imageList || []).map((image, index) => (
          <img
            key={`${image.url}-carousel-image-${index}`}
            src={image.url}
            alt={image?.alt || "carousel image"}
            className={`carousel-image absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            data-index={index}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      {(imageList?.length || 0) > 1 && (
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
      {(imageList?.length || 0) > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform space-x-3">
          {(imageList || []).map((image, index) => (
            <button
              key={`${image.url}-dot-${index}`}
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
  )
}
