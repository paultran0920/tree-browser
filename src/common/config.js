/**
 * Application configuration
 */
const config = {
    FILE_SERVER_URL: process.env.FILE_SERVER_URL || 'http://localhost:8080'
}

global.config = config
