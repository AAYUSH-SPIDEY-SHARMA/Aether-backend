// Logger Utility
// Centralized logging with timestamps and levels

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const colors = {
    info: '\x1b[36m',    // Cyan
    warn: '\x1b[33m',    // Yellow
    error: '\x1b[31m',   // Red
    debug: '\x1b[35m',   // Magenta
    reset: '\x1b[0m',    // Reset
};

function formatTimestamp(): string {
    return new Date().toISOString();
}

function log(level: LogLevel, message: string, meta?: object): void {
    const timestamp = formatTimestamp();
    const color = colors[level];
    const reset = colors.reset;

    const logMessage = `${color}[${timestamp}] [${level.toUpperCase()}]${reset} ${message}`;

    if (level === 'error') {
        console.error(logMessage, meta ? meta : '');
    } else if (level === 'warn') {
        console.warn(logMessage, meta ? meta : '');
    } else {
        console.log(logMessage, meta ? meta : '');
    }
}

export const logger = {
    info: (message: string, meta?: object) => log('info', message, meta),
    warn: (message: string, meta?: object) => log('warn', message, meta),
    error: (message: string, meta?: object) => log('error', message, meta),
    debug: (message: string, meta?: object) => {
        if (process.env.NODE_ENV === 'development') {
            log('debug', message, meta);
        }
    },
};

export default logger;
