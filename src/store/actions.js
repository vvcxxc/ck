let modules = [
  'ql'
]
export const reset = ({ dispatch }) => {
  modules.forEach((module) => {
    dispatch(`${module}/reset`)
    // dispatch(`${module}`)
  })
}
