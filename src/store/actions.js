import { viewInfo } from "@/api/api";
let modules = [
  'ql'
]
export default {
  getInfo(context){
    viewInfo().then(res => {
      context.commit('INFO',{
        ...res.data
      })
    })
  },

 reset = ({ dispatch }) => {
  modules.forEach((module) => {
    dispatch(`${module}/reset`)
    // dispatch(`${module}`)
  })
}
