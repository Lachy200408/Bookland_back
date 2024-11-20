export function deleteAccents (str) {
  str = str.replace(/[àáâãäå]/g, 'a')
  str = str.replace(/[èéêë]/g, 'e')
  str = str.replace(/[ìíîï]/g, 'i')
  str = str.replace(/[òóôõö]/g, 'o')
  str = str.replace(/[ùúûü]/g, 'u')
  str = str.replace(/[ýÿ]/g, 'y')
  str = str.replace(/[ÀÁÂÃÄÅ]/g, 'A')
  str = str.replace(/[ÈÉÊË]/g, 'E')
  str = str.replace(/[ÌÍÎÏ]/g, 'I')
  str = str.replace(/[ÒÓÔÕÖ]/g, 'O')
  str = str.replace(/[ÙÚÛÜ]/g, 'U')
  str = str.replace(/[ÝŸ]/g, 'Y')

  return str
}

export function deleteSpaces (str) {
  str = str.replace(/\s/g, '')
  return str
}
