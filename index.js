import express from "express";
import cors from "cors";
import sequelize from "./src/db/index.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./src/routes/index.js";
import swaggerOptions from "./swaggerOptions.json" assert { type: "json" };
import { PORT } from "./src/config/env.js";

const app = express();
const port = PORT || 5000;

app.use(express.json());
app.use(cors());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", router);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.listen(port, () =>
  console.log("Servidor executando em http://localhost:" + port)
);

export default app;
