import { JSONObject } from "./JSONObject";

export type JSONValue = string | number | boolean | Date | Array<JSONValue> | JSONObject;