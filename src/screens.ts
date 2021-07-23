import { Charsets as cs, Control as ctrl, Graphics as g, Modes as mo } from '..'
import _ from 'lodash'
import wcwidth from 'wcwidth'

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
        public fg: any = 'default',
        public bg: any = 'default',
        public bold: any = false,
        public italics: any = false,
        public underscore: any = false,
        public strikethrough: any = false,
        public reverse: any = false,
        public blink: any = false,
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
        { default: value },
        {
            get(target: any, p: string | symbol): any {
                return target.hasOwnProperty(p) ? target[p] : target.default
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
                if (p === 'values') {
                    return () => {
                        return Object.values(target)
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

    get display() {
        const render = (line: any) => {
            let isWideChar = false
            let res: string[] = []
            for (let i = 0; i < this.columns; i++) {
                if (isWideChar) {
                    isWideChar = false
                    continue
                }
                let char = line[i].data
                if (_.sum(char.slice(1).map(wcwidth)) !== 0) throw new Error()
                isWideChar = wcwidth(char[0]) === 2
                res.push(char)
            }
            return res
        }
        return _.range(this.lines).map((x) => render(this.buffer[x])!.join(''))
    }

    resize(lines: number = 0, columns: number = 0) {
        lines = lines || this.lines
        columns = columns || this.columns
        if (lines === this.lines && columns === this.columns) return
        _.range(lines).forEach((x) => this.dirty.add(x))
        if (lines < this.lines) {
            this.saveCursor()
            this.cursorPosition(0, 0)
            this.deleteLines(this.lines - lines)
            this.restoreCursor()
        }
        if (columns < this.columns) {
            for (const line of this.buffer.values()) {
                for (const i of _.range(columns, this.columns)) {
                    line.splice(i, i)
                }
            }
        }
        this.lines = lines
        this.columns = columns
        this.setMargins()
    }

    setMargins(top: number | null = null, bottom: number | null = null) {
        if (!top && bottom === null) {
            this.margins = null
            return
        }
        const margins = this.margins || new Margins(0, this.lines - 1)

        if (top === null) top = margins.top
        else top = _.max([0, _.min([top - 1, this.lines - 1])])!
        if (bottom === null) bottom = margins.bottom
        else bottom = _.max([0, _.min([bottom - 1, this.lines - 1])])!
        if (bottom! - top! >= -1) {
            this.margins = new Margins(top!, bottom!)

            this.cursorPosition()
        }
    }

    setMode(modes: any[] = [], args: any = {}) {
        if (args.private) {
            modes = modes.map((x) => x << 5)
            if (modes.includes(mo.DECSCNM)) {
                _.range(this.lines).forEach((x) => this.dirty.add(x))
            }
        }

        modes.forEach((x) => this.mode.add(x))

        if (modes.includes(mo.DECCOLM)) {
            this.savedColumns = this.columns
            this.resize(0, 132)
            this.eraseInDisplay(2)
            this.cursorPosition()
        }

        if (modes.includes(mo.DECOM)) {
            this.cursorPosition()
        }

        if (modes.includes(mo.DECSCNM)) {
            for (const line of this.buffer.values()) {
                line.default = this.defaultChar
                for (const x of line) {
                    line[x] = new Char(
                        line[x].data,
                        line[x].fg,
                        line[x].bg,
                        line[x].bold,
                        line[x].italics,
                        line[x].underscore,
                        line[x].strikethrough,
                        true,
                        line[x].blink,
                    )
                }
                this.selectGraphicRendition(7)
            }
        }
    }

    resetMode(modes: any[] = [], args: any = {}) {
        if (args.private) {
            modes = modes.map((x) => x << 5)
            if (modes.includes(mo.DECSCNM)) {
                _.range(this.lines).forEach((x) => this.dirty.add(x))
            }
        }

        this.mode = new Set(_.difference(Array.from(this.mode), modes))

        if (modes.includes(mo.DECCOLM)) {
            if (this.columns === 132 && this.savedColumns !== null) {
                this.resize(0, this.savedColumns)
                this.savedColumns = null
            }
            this.eraseInDisplay(2)
            this.cursorPosition()
        }

        if (modes.includes(mo.DECOM)) {
            this.cursorPosition()
        }

        if (modes.includes(mo.DECSCNM)) {
            for (const line of this.buffer.values()) {
                line.default = this.defaultChar
                for (const x of line) {
                    line[x] = new Char(
                        line[x].data,
                        line[x].fg,
                        line[x].bg,
                        line[x].bold,
                        line[x].italics,
                        line[x].underscore,
                        line[x].strikethrough,
                        false,
                        line[x].blink,
                    )
                }
            }
            this.selectGraphicRedition(27)
        }

        if (modes.includes(mo.DECTCEM)) {
            this.cursor.hidden = true
        }
    }
}
