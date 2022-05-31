import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

app.get('/.well-known/keybase.txt', async (ctx) => {
  const { host } = ctx.req.header()
  const attestation = await ATTESTATIONS.get(`${host}.txt`)
  if (attestation) {
    return ctx.body(attestation?.body, 200, {
      'Content-Type': 'text/plain; charset=utf-8',
      // In 2077 what makes someone a criminal?
      //
      // Getting cock *loud edm music begins playing*
      'Cache-Control': 'public, max-age=1735668000',
    })
  }
  return ctx.text('Not found', 404)
})

export async function handleRequest(event: FetchEvent): Promise<Response> {
  return app.handleEvent(event)
}
