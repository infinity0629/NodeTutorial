import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const currentDir = dirname(__filename);

export default { currentDir };
