// *Reset*.
export const RIS = 'c'

// *Index*: Move cursor down one line in same column. If the cursor is
// at the bottom margin, the screen performs a scroll-up.
export const IND = 'D'

// *Next line*: Same as :data:`pyte.control.LF`.
export const NEL = 'E'

// Tabulation set: Set a horizontal tab stop at cursor position.
export const HTS = 'H'

// *Reverse index*: Move cursor up one line in same column. If the
// cursor is at the top margin, the screen performs a scroll-down.
export const RI = 'M'

// Save cursor: Save cursor position, character attribute (graphic
// rendition), character set, and origin mode selection (see
// :data:`DECRC`).
export const DECSC = '7'

// *Restore cursor*: Restore previously saved cursor position, character
// attribute (graphic rendition), character set, and origin mode
// selection. If none were saved, move cursor to home position.
export const DECRC = '8'

// "Sharp" escape sequences.
// -------------------------

// *Alignment display*: Fill screen with uppercase E's for testing
// screen focus and alignment.
export const DECALN = '8'

// ECMA - 48 CSI sequences.
// ---------------------

// *Insert character*: Insert the indicated # of blank characters.
export const ICH = '@'

// *Cursor up*: Move cursor up the indicated # of lines in same column.
// Cursor stops at top margin.
export const CUU = 'A'

// *Cursor down*: Move cursor down the indicated # of lines in same
// column. Cursor stops at bottom margin.
export const CUD = 'B'

// *Cursor forward*: Move cursor right the indicated # of columns.
// Cursor stops at right margin.
export const CUF = 'C'

// *Cursor back*: Move cursor left the indicated # of columns. Cursor
// stops at left margin.
export const CUB = 'D'

// *Cursor next line*: Move cursor down the indicated # of lines to
// column 1.
export const CNL = 'E'

// *Cursor previous line*: Move cursor up the indicated # of lines to
// column 1.
export const CPL = 'F'

// *Cursor horizontal align*: Move cursor to the indicated column in
// current line.
export const CHA = 'G'

// *Cursor position*: Move cursor to the indicated line, column (origin
// at ``1, 1``).
export const CUP = 'H'

// *Erase data* (default: from cursor to end of line).
export const ED = 'J'

// *Erase in line* (default: from cursor to end of line).
export const EL = 'K'

// *Insert line*: Insert the indicated # of blank lines, starting from
// the current line. Lines displayed below cursor move down. Lines moved
// past the bottom margin are lost.
export const IL = 'L'

// *Delete line*: Delete the indicated # of lines, starting from the
// current line. As lines are deleted, lines displayed below cursor
// move up. Lines added to bottom of screen have spaces with same
// character attributes as last line move up.
export const DL = 'M'

// *Delete character*: Delete the indicated # of characters on the
// current line. When character is deleted, all characters to the right
// of cursor move left.
export const DCH = 'P'

// *Erase character*: Erase the indicated # of characters on the
// current line.
export const ECH = 'X'

// *Horizontal position relative*: Same as :data:`CUF`.
export const HPR = 'a'

// *Device Attributes*.
export const DA = 'c'

// *Vertical position adjust*: Move cursor to the indicated line,
// current column.
export const VPA = 'd'

// *Vertical position relative*: Same as :data:`CUD`.
export const VPR = 'e'

// *Horizontal / Vertical position*: Same as :data:`CUP`.
export const HVP = 'f'

// *Tabulation clear*: Clears a horizontal tab stop at cursor position.
export const TBC = 'g'

// *Set mode*.
export const SM = 'h'

// *Reset mode*.
export const RM = 'l'

// *Select graphics rendition*: The terminal can display the following
// character attributes that change the character display without
// changing the character (see :mod:`pyte.graphics`).
export const SGR = 'm'

// *Device status report*.
export const DSR = 'n'

// *Select top and bottom margins*: Selects margins, defining the
// scrolling region; parameters are top and bottom line. If called
// without any arguments, whole screen is used.
export const DECSTBM = 'r'

// *Horizontal position adjust*: Same as :data:`CHA`.
export const HPA = "'"
