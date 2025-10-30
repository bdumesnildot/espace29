import type { APIRoute } from "astro"
import { mailgunClient } from "@lib/mail/mailgun"

export const prerender = false

type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  privacy: string
}

const validateFormData = (
  data: Record<string, any>
): ContactFormData | null => {
  const { firstName, lastName, email, phone, subject, message, privacy } = data

  // Validate required fields
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !subject?.trim() ||
    !message?.trim() ||
    privacy !== "on"
  ) {
    return null
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return null
  }

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone?.trim() || undefined,
    subject,
    message: message.trim(),
    privacy,
  }
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const validatedData = validateFormData(data)
  if (!validatedData) {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { firstName, lastName, email, phone, subject, message } = validatedData

  // Build HTML email
  const subjectLabel = subject
  const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nouveau message de contact envoyé depuis le site</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ""}
          <p><strong>Sujet:</strong> ${subjectLabel}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      </div>
    `

  const textContent = `
Nouveau message de contact

Nom: ${firstName} ${lastName}
Email: ${email}
${phone ? `Téléphone: ${phone}` : ""}
Sujet: ${subjectLabel}

Message:
${message}
    `

  const recipientEmail = import.meta.env.MAILGUN_RECIPIENT_EMAIL
  if (!recipientEmail) {
    console.error("MAILGUN_RECIPIENT_EMAIL not configured")
    return new Response(
      JSON.stringify({ error: "Email service not properly configured" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  await mailgunClient
    .send({
      senderName: `${firstName} ${lastName}`,
      from: import.meta.env.MAILGUN_FROM_EMAIL,
      to: recipientEmail,
      subject: `[espace29.com] ${subjectLabel}`,
      text: textContent,
      html: htmlContent,
    })
    .then((res) => {
      console.log("Mailgun send response:", res)
    })
    .catch((error) => {
      console.error("Mailgun send error:", error)
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    })

  return new Response(
    JSON.stringify({ success: true, message: "Email sent successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
