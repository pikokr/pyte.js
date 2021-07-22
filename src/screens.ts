import { Charsets as cs, Control as ctrl, Graphics as g, Modes as mo } from '..'

class Margins {
    constructor(public top: number, bottom: number) {}
}

class SavePoint {
    constructor(
        public cursor: Cursor,
        public g0_charset: any,
        public g1_charset: any,
        public origin: any,
        public wrap: any,
    ) {}
}

class Char {
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

class Cursor {
    hidden = false
    constructor(
        public x: string,
        public y: string,
        public attrs = new Char(''),
    ) {}
}

const StaticDefaultDict = (value: any) => {
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
