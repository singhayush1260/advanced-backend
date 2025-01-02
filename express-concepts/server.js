import dotenv from "dotenv";
dotenv.config();
import express from "express";
import configureCors from "./config/corsConfig.js";
import { addTimestamp, requestLogger } from "./middleware/customMiddleware.js";
import {
  APIError,
  asyncHandler,
  globalErrorHandler,
} from "./middleware/errorHandler.js";
import { urlVersioning } from "./middleware/apiVersioning.js";
import { createBasicRateLimiter } from "./middleware/rateLimiter.js";
import itemRoutes from "./routes/itemRoutes.js";
const PORT = process.env.PORT || 3001;

const app = express();

app.use(requestLogger);
app.use(addTimestamp);

app.use(configureCors());
app.use(createBasicRateLimiter(100,15*60*1000)); // 100 requests per 15m
app.use(express.json());
app.use(urlVersioning("v1"));
app.use("/api/v1",itemRoutes);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
