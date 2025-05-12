import ApiError from '@utils/ApiError'
import { env } from './environment'

var WHITELIST_DOMAINS = ['http://example1.com', 'http://example2.com', 'http://localhost:5173', 'https://trello-web-mauve-nine.vercel.app']
export const corsOptions = {
  origin: function (origin, callback) {
    if (env.BUILD_MODE == 'dev') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new ApiError(`${origin} is not our CORS policy!`))
  },
  credentials: true  
}
