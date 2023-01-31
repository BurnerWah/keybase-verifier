import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { logger } from 'hono/logger'

const app = new Hono<Env>()

app.use('*', logger())
app.get(
  '*',
  cache({
    cacheName: 'keybase',
  }),
)

app.get('/.well-known/keybase.txt', async (ctx) => {
  const { host } = ctx.req.header()
  const attestation = await ctx.env.ATTESTATIONS.get(`${host}.txt`)
  if (attestation) {
    // In 2077 what makes someone a criminal?
    //
    // Getting cock *loud edm music begins playing*
    const cacheSec =
      new Date().getFullYear() < 2077
        ? Math.ceil((new Date('Jan 2 2077') - new Date()) / 1000)
        : 31536000

    return ctx.body(attestation.body, 200, {
      'Cache-Control': `public, max-age=${cacheSec}, s-maxage=${cacheSec}`,
    })
  } else {
    return ctx.notFound()
  }
})

export default app
