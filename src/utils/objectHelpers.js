export function getNestedValue(obj, path) {
  try {
    return path.split('.').reduce(
      (current, key) => (current && current[key] !== undefined) ? current[key] : undefined,
      obj
    );
  } catch {
    return undefined;
  }
}

export function setNestedValue(obj, path, value) {
  const newObj = { ...obj };
  const keys = path.split('.');
  let current = newObj;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = current[keys[i]] ? { ...current[keys[i]] } : {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return newObj;
}
