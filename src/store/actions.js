import { viewInfo } from "@/api/api";
export default {
  getInfo(context){
    viewInfo().then(res => {
      context.commit('INFO',{
        ...res.data
      })
    })
  }
}
