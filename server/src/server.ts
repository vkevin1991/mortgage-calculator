import express from "express";
import cors from "cors";
import mortgageRoutes from "./routes/mortgage.routes";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/mortgage", mortgageRoutes);

if (["production"].includes(process.env.NODE_ENV || "")) {
  app.use(express.static("client/dist"));

  const path = require("path");
  app.get("*", (_, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("Mortgage API!");
  });
}

app.get("*", (req, res) => {
  res.send("Mortgage API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
