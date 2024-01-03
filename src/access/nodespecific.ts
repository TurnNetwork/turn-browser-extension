//@ts-nocheck
import { Buffer } from 'buffer'
// import assert from 'assert'

window.Buffer = Buffer as any
// window.assert = assert as any
window.process  = {env:{}}