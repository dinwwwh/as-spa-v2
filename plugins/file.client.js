export default function ({ $checkType }, inject) {
  inject('file', {
    read,
  })

  async function read(file) {
    if (!$checkType('File', file)) return null
    return await new Promise((resolve, reject) => {
      const reader = new window.FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }
}
