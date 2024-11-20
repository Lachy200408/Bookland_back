export const optionsMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS' && (req.url.includes('/upload') || req.url.includes('/book'))) {
    return res.status(200).json({})
  }
  next()
}
