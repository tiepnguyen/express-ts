import { createLogger, format, transports } from 'winston'

let { combine, simple, timestamp, printf, colorize } = format
let logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp }) => {
    return [timestamp, level, message].map((item) => `"${item}"`).join(', ')
  }),
)
let logger = createLogger({
  transports: [
    new transports.File({ format: logFormat, filename: 'logs/error.log', level: 'error' }),
    new transports.File({ format: logFormat, filename: 'logs/combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple()),
    }),
  )
}

export default logger
