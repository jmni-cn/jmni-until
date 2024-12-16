
import * as array from "./array"
import * as date from "./date"
import * as dom from "./dom"
import * as number from "./number"
import * as string from "./string"
import * as until from "./until"
import * as isMobile from "./navigator"
export * from './array'
export * from './date'
export * from './dom'
export * from './number'
export * from './string'
export * from './until'
export * from './navigator'
export default {
    ...array,
    ...date,
    ...dom,
    ...number,
    ...string,
    ...until,
    ...isMobile,
}