export default function (context, inject) {
  inject('string', {
    limit,
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
}
