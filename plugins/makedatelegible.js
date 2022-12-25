export default (context, inject) => {
  const makeDateLegible = (receivedTime) => {
    const date = new Date(parseInt(receivedTime))
    const day = date.getDay()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    if (day < 10 && month < 10) {
      return `0${day}/0${month}/${year}`
    }
    return `${day}/ ${month}/${year}`
  }
  inject('makeDateLegible', makeDateLegible)
  context.$makeDateLegible = makeDateLegible
}