import cors from "cors";

const configureCors = () => {
  return cors({
    origin: (origin, cb) => {
      const allowedOrigins = ["http://localhost:3000"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error("Origin not allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
  });
};
export default configureCors;