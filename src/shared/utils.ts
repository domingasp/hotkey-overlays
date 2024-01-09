function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function electronHotkeyToMappedShortcut(hotkey: string) {}

function mapKeyCodeToChar(key: string, forElectron = false) {
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

  sortedKeys = sortedKeys.map((key) => mapKeyCodeToChar(key, forElectron));

  return [...modifiers, ...sortedKeys];
}

export default formatHotkeyShortcut;
