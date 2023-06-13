/***
 * Copyright (c) Myia 2023-2023 - All Rights Reserved
 */

import os from "os";
import path from "path";
import { execSync } from "node:child_process";

const __dirname = new URL(".", import.meta.url).pathname;
const root = path.join(__dirname, "..");

let file = "";
switch (os.platform()) {
  case "darwin":
    file = "cld3-darwin-x64.node";
    break;
  case "linux":
    file = "cld3-linux-x64.node";
    break;
}
if (!file) {
  throw new Error("cld3 is not supported on this platform.");
}

execSync(`mv build/Release/cld3.node addons/${file}`, { cwd: root });