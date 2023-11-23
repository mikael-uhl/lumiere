import { fileURLToPath } from "url";
import { dirname, join } from "path";

const getProjectRoot = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, "..", "..");
};

export default getProjectRoot;
