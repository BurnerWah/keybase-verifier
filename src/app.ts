import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { logger } from 'hono/logger'

const app = new Hono<Env>()

app.use('*', logger())
app.get(
  '*',
  cache({
    cacheName: 'keybase',
    // In 2077 what makes someone a criminal?
    //
    // Getting cock *loud edm music begins playing*
    cacheControl: 'public, max-age=1735668000, s-maxage=1735668000',
  }),
)

app.get('/.well-known/keybase.txt', async (ctx) => {
  const { host } = ctx.req.header()
  const attestation = await ctx.env.ATTESTATIONS.get(`${host}.txt`)
  if (attestation) {
    return ctx.body(attestation.body, 200)
  } else {
    return ctx.notFound()
  }
})

export default app
