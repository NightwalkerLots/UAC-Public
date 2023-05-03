import { evalContext } from "../core/cc/eval.js";
import module from "./lib/module.js";
import * as misc from './lib/misc.js';
import playerDat from "./lib/playerdat.js";
import uacStorage from "./lib/storage.js";
evalContext.uac = {
    module,
    moduleStorage: uacStorage,
    playerDat,
    misc,
};
