import rateLimit from "express-rate-limit";

export const createBasicRateLimiter = (maxReq, time) => {
  return rateLimit({
    max: maxReq,
    windowMs: time,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });
};
