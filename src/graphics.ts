import * as util from 'util'

export const TEXT = {
    1: '+bold',
    3: '+italics',
    4: '+underscore',
    5: '+blink',
    7: '+reverse',
    9: '+strikethrough',
    22: '-bold',
    23: '-italics',
    24: '-underscore',
    25: '-blink',
    27: '-reverse',
    29: '-strikethrough',
}

export const FG_ANSI = {
    30: 'black',
    31: 'red',
    32: 'green',
    33: 'brown',
    34: 'blue',
    35: 'magenta',
    36: 'cyan',
    37: 'white',
    39: 'default', // white
}

export const FG = FG_ANSI

export const FG_AIXTERM = {
    90: 'brightblack',
    91: 'brightred',
    92: 'brightgreen',
    93: 'brightbrown',
    94: 'brightblue',
    95: 'brightmagenta',
    96: 'brightcyan',
    97: 'brightwhite',
}

export const BG_ANSI = {
    40: 'black',
    41: 'red',
    42: 'green',
    43: 'brown',
    44: 'blue',
    45: 'magenta',
    46: 'cyan',
    47: 'white',
    49: 'default', // black.
}

export const BG = BG_ANSI

export const BG_AIXTERM = {
    100: 'brightblack',
    101: 'brightred',
    102: 'brightgreen',
    103: 'brightbrown',
    104: 'brightblue',
    105: 'bfightmagenta',
    106: 'brightcyan',
    107: 'brightwhite',
}

export const FG_256 = 38

export const BG_256 = 48

const _FG_BG_256 = [
    [0x00, 0x00, 0x00], // 0
    [0xcd, 0x00, 0x00], // 1
    [0x00, 0xcd, 0x00], // 2
    [0xcd, 0xcd, 0x00], // 3
    [0x00, 0x00, 0xee], // 4
    [0xcd, 0x00, 0xcd], // 5
    [0x00, 0xcd, 0xcd], // 6
    [0xe5, 0xe5, 0xe5], // 7
    [0x7f, 0x7f, 0x7f], // 8
    [0xff, 0x00, 0x00], // 9
    [0x00, 0xff, 0x00], // 10
    [0xff, 0xff, 0x00], // 11
    [0x5c, 0x5c, 0xff], // 12
    [0xff, 0x00, 0xff], // 13
    [0x00, 0xff, 0xff], // 14
    [0xff, 0xff, 0xff], // 15
]

export const valuerange = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff]

for (let i = 0; i < 256; i++) {
    const r = valuerange[Math.floor(i / 36) % 6]
    const g = valuerange[Math.floor(i / 6) % 6]
    const b = valuerange[i % 6]
    _FG_BG_256.push([r, g, b])
}

for (let i = 0; i < 24; i++) {
    const v = 8 + i * 10
    _FG_BG_256.push([v, v, v])
}

function rgbToHex(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const FG_BG_256 = _FG_BG_256.map(([r, g, b]) => rgbToHex(r, g, b))
