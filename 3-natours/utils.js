import url from "url";
import { dirname as __dirname } from "path";

const dirname = __dirname(url.fileURLToPath(import.meta.url));

export default { dirname };
