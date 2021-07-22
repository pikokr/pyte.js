// *Space*: Not suprisingly -- ``" "``.
export const SP = ' '

// *Null*: Does nothing.
export const NUL = '\x00'

export const BEL = '\x07'

// *Backspace*: Backspace one column, but not past the begining of the
// line.
export const BS = '\x08'

// *Horizontal tab*: Move cursor to the next tab stop, or to the end
// of the line if there is no earlier tab stop.
export const HT = '\x09'

// *Linefeed*: Give a line feed, and, if :data:`pyte.modes.LNM` (new
// line mode) is set also a carriage return.
export const LF = '\n'
// *Vertical tab*: Same as :data:`LF`.
export const VT = '\x0b'
// *Form feed*: Same as :data:`LF`.
export const FF = '\x0c'

// *Carriage return*: Move cursor to left margin on current line.
export const CR = '\r'

// *Shift out*: Activate G1 character set.
export const SO = '\x0e'

// *Shift in*: Activate G0 character set.
export const SI = '\x0f'

// *Cancel*: Interrupt escape sequence. If received during an escape or
// control sequence, cancels the sequence and displays substitution
// character.
export const CAN = '\x18'
// *Substitute*: Same as :data:`CAN`.
export const SUB = '\x1a'

// *Escape*: Starts an escape sequence.
export const ESC = '\x1b'

// *Delete*: Is ignored.
export const DEL = '\x7f'

// *Control sequence introducer*.
export const CSI_C0 = ESC + '['
export const CSI_C1 = '\x9b'
export const CSI = CSI_C0

// *String terminator*.
export const ST_C0 = ESC + '\\'
export const ST_C1 = '\x9c'
export const ST = ST_C0

// *Operating system command*.
export const OSC_C0 = ESC + ']'
export const OSC_C1 = '\x9d'
export const OSC = OSC_C0
