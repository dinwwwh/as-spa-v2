export default function (context, inject) {
  inject('string', {
    limit,
    capitalizeFirstLetter: toUpperCaseFirstLetter,
    toUpperCaseFirstLetter,
    toLowerCaseFirstLetter,
  })

  function limit(text, length, wildcard = '...') {
    if (!text || text.length <= length) return text

    text = text.substr(0, length + 1)
    const lastSpaceAt = text.lastIndexOf(' ')

    if (lastSpaceAt > length - 6) {
      return text.substr(0, lastSpaceAt) + wildcard
    }
    return text.substr(0, length) + wildcard
  }

  function toUpperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function toLowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
  }
}
