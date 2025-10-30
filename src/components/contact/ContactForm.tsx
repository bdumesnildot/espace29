import { useForm } from "react-hook-form"
import { useState } from "react"

type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  privacy: boolean
}

export const ContactForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmissionStatus("idle")
      const response = await fetch("/api/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorResult = await response.json()
        throw new Error(errorResult.error || "Une erreur s'est produite.")
      }

      setSubmissionStatus("success")
      reset()
    } catch (error: any) {
      setSubmissionStatus("error")
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Contact Form */}
      <form
        id="contactForm"
        className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
        // method="POST"
        // action="/api/mail/send"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
              Prénom <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Votre prénom"
              className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
              {...register("firstName", { required: "Le prénom est requis" })}
            />
            {errors.firstName && (
              <p className="mt-1 text-lg text-red-700">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
              Nom <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Votre nom"
              className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
              {...register("lastName", { required: "Le nom est requis" })}
            />
            {errors.lastName && (
              <p className="mt-1 text-lg text-red-700">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="votre.email@exemple.com"
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format d'email invalide",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-lg text-red-700">{errors.email.message}</p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+33 X XX XX XX XX"
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            {...register("phone")}
          />
        </div>

        {/* Subject */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Sujet <span className="text-red-700">*</span>
          </label>
          <select
            id="subject"
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            {...register("subject", { required: "Le sujet est requis" })}
          >
            <option value="">Choisissez un sujet</option>
            <option value="Question générale">Question générale</option>
            <option value="Événement / Spectacle">Événement / Spectacle</option>
            <option value="Artiste / Collaboration">
              Artiste / Collaboration
            </option>
            <option value="Location d'espace">Location d'espace</option>
            <option value="Partenariat">Partenariat</option>
            <option value="Presse / Médias">Presse / Médias</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-lg text-red-700">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Message <span className="text-red-700">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Décrivez votre demande, votre projet ou vos questions..."
            className="font-eina03 h-30 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            {...register("message", { required: "Le message est requis" })}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-lg text-red-700">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
              {...register("privacy", {
                required: "Vous devez accepter les conditions",
              })}
            />
            <label className="font-eina03 text-lg text-gray-600">
              J'accepte que mes données personnelles soient utilisées pour
              traiter ma demande. Les informations collectées sont utilisées
              uniquement pour vous répondre et ne sont jamais partagées avec des
              tiers. <span className="text-red-700">*</span>
            </label>
          </div>
          {errors.privacy && (
            <p className="mt-1 text-lg text-red-700">
              {errors.privacy.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="font-eina04 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:cursor-pointer hover:bg-gray-700 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center">
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </div>
          </button>
        </div>
      </form>

      {/* Status Messages */}
      {submissionStatus === "success" && (
        <div
          id="successMessage"
          className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 md:absolute md:top-[-84px] md:w-full"
        >
          <p className="text-green-800">
            Merci! Votre message a été envoyé avec succès.
          </p>
        </div>
      )}
      {submissionStatus === "error" && (
        <div
          id="errorMessage"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 md:absolute md:top-[-84px] md:w-full"
        >
          <p id="errorText" className="text-red-800">
            {errorMessage || "Une erreur s'est produite. Veuillez réessayer."}
          </p>
        </div>
      )}
    </div>
  )
}
