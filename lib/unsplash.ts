import { createApi } from 'unsplash-js'

export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSLPASH_ACCES_KEY!,
  fetch: fetch
})