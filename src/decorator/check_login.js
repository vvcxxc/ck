import router from '@/router'
import { authUser as checkOut } from '@api/api'
import { querystring } from 'vux'
import store from "@/store"
 
const flagDevelopment = process.env.NODE_ENV === 'development'
// why execute two at here
export default async function checkLogin (target, name, descriptor) {
  const params = querystring.parse(window.location.search)
  const token = window.localStorage.token 

  if (params['role_type']) {
    window.localStorage.setItem('role_type', 'entrepreneur')
    store.commit("ROLE_TYPE", { type: 'entrepreneur' })
  }

  if (flagDevelopment) {
    console.log('开发环境')
    // Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdGVzdC5hcGkudGRpYW55aS5jb20vYXBpL2VudHJlcHJlbmV1ci9sb2dpbiIsImlhdCI6MTU0MjYxMjgxNiwiZXhwIjoxNTQyNzAyODE2LCJuYmYiOjE1NDI2MTI4MTYsImp0aSI6IjZLeHRlZkVZRUg3M0ZvR28iLCJzdWIiOjEyMiwicHJ2IjoiNzc5NmRhZTI5MWI0ODhhZjViMDFmNTJhMGRjNzI5ZWRmYWVmOGI4YyJ9.1JBfzrsrmTtgyg5fQogWZeBl_59aNEgs1H5VVUpXlFw
  } else {
    if (!token) {
      router.push('/login')
    } else {
      await checkOut().catch(err => {
        console.log(err)
        throw Error('happen a error')
      })
    }
  }
}
