import { createClient } from './config/postgres-config.js'

const client = await createClient()

process.stdin.on('data', (data) => {
  const text = data.toString()
  try {
    client.query(text).then(res => {
      console.log(res)
    })
  } catch (e) {
    console.error(e)
  }
})
