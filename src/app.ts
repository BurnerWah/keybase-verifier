import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

app.get('/.well-known/keybase.txt', async (ctx) => {
  const { pathname, origin } = new URL(ctx.req.url)
  const cacheUrl = new URL(pathname, origin)
  const cacheKey = cacheUrl.toString()
  const cache = await caches.open('keybase:cache')

  let res = await cache.match(cacheKey)
  if (!res) {
    const { host } = ctx.req.header()
    const attestation = await ctx.env.ATTESTATIONS.get(`${host}.txt`)
    if (attestation) {
      res = ctx.body(attestation.body, 200, {
        'Content-Type': 'text/plain; charset=utf-8',
        // In 2077 what makes someone a criminal?
        //
        // Getting cock *loud edm music begins playing*
        'Cache-Control': 'public, max-age=1735668000, s-maxage=1735668000',
      })
    } else {
      res = ctx.text('Not found', 404, {
        'Cache-Control': 'public, max-age=1735668000, s-maxage=1735668000',
      })
    }
    ctx.executionCtx.waitUntil(cache.put(cacheKey, res.clone()))
  }

  return res
})

export default app
