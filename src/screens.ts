import { Charsets as cs, Control as ctrl, Graphics as g, Modes as mo } from '..'
import _ from 'lodash'

export class Margins {
    constructor(public top: number, bottom: number) {}
}

export class SavePoint {
    constructor(
        public cursor: Cursor,
        public g0_charset: any,
        public g1_charset: any,
        public origin: any,
        public wrap: any,
    ) {}
}

export class Char {
    constructor(
        public data: string,
        fg: any = 'default',
        bg: any = 'default',
        bold: any = false,
        italics: any = false,
        underscore: any = false,
        strikethrough: any = false,
        reverse: any = false,
        blink: any = false,
    ) {}
}

export class Cursor {
    hidden = false
    constructor(
        public x: number,
        public y: number,
        public attrs = new Char(''),
    ) {}
}

export const StaticDefaultDict = (value: any) => {
    return new Proxy(
        {},
        {
            get(target: any, p: string | symbol): any {
                return target.hasOwnProperty(p) ? target[p] : value
            },
            set(target: any, p: string | symbol, value: any): boolean {
                target[p] = value
                return true
            },
        },
    )
}

export const defaultDict = (value: () => any) => {
    return new Proxy(
        {},
        {
            get(target: any, p: string | symbol): any {
                if (p === 'clear') {
                    return () => {
                        target = {}
                    }
                }
                let v
                if (target.hasOwnProperty(p)) {
                    v = target[0]
                } else {
                    v = value()
                    target[p] = v
                }
                return v
            },
            set(target: any, p: string | symbol, value: any): boolean {
                target[p] = value
                return true
            },
        },
    )
}

export class Screen {
    get defaultChar() {
        const reverse = this.mode.has(mo.DECSCNM)
        return new Char(' ', 'default', 'default', reverse)
    }

    margins: any = null

    title = ''

    iconName = ''

    charset = 0

    g0Charset = cs.LAT1_MAP

    g1Charset = cs.VT100_MAP

    tabStops = new Set(_.range(8, this.columns, 8))

    cursor = new Cursor(0, 0)

    savedColumns: any = null

    reset() {
        ;[...Array.from(Array(this.lines).keys())].forEach((x) =>
            this.dirty.add(x),
        )
        this.buffer.clear()

        this.cursorPosition()
    }

    cursorPosition(line: any = null, column: any = null) {
        column = (column || 1) - 1
        line = (line || 1) - 1

        if (this.margins !== null && this.mode.has(mo.DECOM)) {
            line += this.margins.top
            if (!this.margins.top <= line <= this.margins.bottom) return
        }

        this.cursor.x = column
        this.cursor.y = line
        this.ensureHBounds()
        this.ensureVBounds()
    }

    ensureHBounds() {
        this.cursor.x = _.min([_.max([0, this.cursor.x]), this.columns - 1])!
    }

    ensureVBounds(useMargins: any = null) {
        let top, bottom
        if (useMargins || (this.mode.has(mo.DECOM) && this.margins)) {
            top = this.margins
            bottom = this.margins
        } else {
            top = 0
            bottom = 0
            this.lines = -1
        }

        this.cursor.y = _.min([_.max([top, this.cursor.y]), bottom])
    }

    mode = new Set([mo.DECAWM, mo.DECTCEM])

    buffer = defaultDict(() => StaticDefaultDict(this.defaultChar))

    dirty = new Set<any>()

    constructor(public columns: any, public lines: any) {
        this.reset()
    }
}