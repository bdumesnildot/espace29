import type { APIRoute } from "astro"
import { mailgunClient } from "@lib/mail/mailgun"

export const POST: APIRoute = async () => {
  await mailgunClient
    .send({
      senderName: "User Name",
      from: "shop@<domain>",
      to: "<to>",
      subject: "<subject>",
      html: "<h1>Title</h1><p>Small description</p>",
    })
    .catch((err) => {
      console.error(err)
      return new Response("Error sending email", { status: 500 })
    })

  return new Response("", { status: 200 })
}
