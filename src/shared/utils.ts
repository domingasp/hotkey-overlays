function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function electronHotkeyCharToKeyCode(char: string) {
  switch (char) {
    case '`':
      return 'backquote';
    case '-':
      return 'minus';
    case '=':
      return 'equal';
    case 'Numlock':
      return 'numlock';
    case 'numdiv':
      return 'divide';
    case 'nummult':
      return 'multiply';
    case 'numsub':
      return 'subtract';
    case 'numadd':
      return 'add';
    case 'numdec':
      return 'decimal';
    case '[':
      return 'bracketleft';
    case ']':
      return 'bracketright';
    case 'Capslock':
      return 'capslock';
    case ';':
      return 'semicolon';
    case "'":
      return 'quote';
    case '#':
      return 'backslash';
    case '\\':
      return 'intlbackslash';
    case ',':
      return 'comma';
    case '.':
      return 'period';
    case '/':
      return 'slash';
    case 'PageUp':
      return 'pageup';
    case 'PageDown':
      return 'pagedown';
    default:
      return char.toLocaleLowerCase();
  }
}

function keyCodeToChar(key: string, forElectron = false) {
  switch (key) {
    case 'backquote':
      return '`';
    case 'minus':
      return '-';
    case 'equal':
      return '=';
    case 'numlock':
      return forElectron ? 'Numlock' : 'Num Lock';
    case 'divide':
      return forElectron ? 'numdiv' : '/';
    case 'multiply':
      return forElectron ? 'nummult' : 'Num Mult';
    case 'subtract':
      return forElectron ? 'numsub' : 'Num Sub';
    case 'add':
      return forElectron ? 'numadd' : 'Num Add';
    case 'decimal':
      return forElectron ? 'numdec' : 'Num Dec';
    case 'bracketleft':
      return '[';
    case 'bracketright':
      return ']';
    case 'capslock':
      return forElectron ? 'Capslock' : 'Caps Lock';
    case 'semicolon':
      return ';';
    case 'quote':
      return "'";
    case 'backslash':
      return '#';
    case 'intlbackslash':
      return '\\';
    case 'comma':
      return ',';
    case 'period':
      return '.';
    case 'slash':
      return '/';
    case 'pageup':
      return 'PageUp';
    case 'pagedown':
      return 'PageDown';
    default:
      return toTitleCase(key);
  }
}

export function electronHotkeyToKeys(hotkey: string) {
  const split = hotkey.split('+');
  return split.map(electronHotkeyCharToKeyCode);
}

function formatHotkeyShortcut(keys: string[], forElectron = false) {
  let sortedKeys: string[] = [...keys];
  const modifiers: string[] = [];

  const hasCtrl = sortedKeys.findIndex((x) => x === 'ctrl');
  if (hasCtrl > -1) {
    sortedKeys.splice(hasCtrl, 1);
    modifiers.push('Ctrl');
  }

  const hasShift = sortedKeys.findIndex((x) => x === 'shift');
  if (hasShift > -1) {
    sortedKeys.splice(hasShift, 1);
    modifiers.push('Shift');
  }

  const hasAlt = sortedKeys.findIndex((x) => x === 'alt');
  if (hasAlt > -1) {
    sortedKeys.splice(hasAlt, 1);
    modifiers.push('Alt');
  }

  sortedKeys = sortedKeys.map((key) => keyCodeToChar(key, forElectron));

  return [...modifiers, ...sortedKeys];
}

export default formatHotkeyShortcut;
