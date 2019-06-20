import { createLogger, format, transports } from 'winston'

const { combine, simple, timestamp, printf, colorize } = format
const logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp }) => {
    return [timestamp, level.toUpperCase() + ':', message].join(' ')
  }),
)
const logger = createLogger({
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
