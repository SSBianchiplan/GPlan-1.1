import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Muitas tentativas de login, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Moderate rate limiter for creation operations
export const createLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 create operations per minute
  message: 'Muitas operações de criação, por favor aguarde um momento.',
  standardHeaders: true,
  legacyHeaders: false,
});
