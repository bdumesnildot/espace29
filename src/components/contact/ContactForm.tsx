import Button from "@components/ui/button/Button.astro"

export const ContactForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Status Messages */}
      <div
        id="successMessage"
        className="mb-4 hidden rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p className="text-green-800">
          Merci! Votre message a été envoyé avec succès.
        </p>
      </div>
      <div
        id="errorMessage"
        className="mb-4 hidden rounded-lg border border-red-200 bg-red-50 p-4"
      >
        <p id="errorText" className="text-red-800">
          Une erreur s'est produite. Veuillez réessayer.
        </p>
      </div>

      {/* Contact Form */}
      <form
        id="contactForm"
        className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"
        onSubmit={handleSubmit}
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
              name="firstName"
              required
              placeholder="Votre prénom"
              className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
              Nom <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Votre nom"
              className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
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
            name="email"
            required
            placeholder="votre.email@exemple.com"
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
        </div>

        {/* Phone (optional) */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+33 X XX XX XX XX"
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
        </div>

        {/* Subject */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Sujet <span className="text-red-700">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
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
        </div>

        {/* Message */}
        <div className="mt-4">
          <label className="font-eina04 mb-2 block text-lg font-medium text-gray-700">
            Message <span className="text-red-700">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Décrivez votre demande, votre projet ou vos questions..."
            className="font-eina03 w-full rounded-lg border border-gray-300 px-3 py-2 text-lg transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
          ></textarea>
        </div>

        {/* Privacy Notice */}
        <div className="mt-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
            />
            <label className="font-eina03 text-lg text-gray-600">
              J'accepte que mes données personnelles soient utilisées pour
              traiter ma demande. Les informations collectées sont utilisées
              uniquement pour vous répondre et ne sont jamais partagées avec des
              tiers. <span className="text-red-700">*</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="font-eina04 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-gray-700 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            disabled={false}
          >
            <div className="flex items-center justify-center">
              Envoyer le message
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}
