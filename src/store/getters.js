export default {
  // token: state => state.token,
  // userInfo: state => state.userInfo,
  // isLoading: state => state.isLoading,
  // memberInfo: state => state.memberInfo,
  // shopInfo: state => state.shopInfo,
  // withdrawInfo: state => state.withdrawInfo,
  // authUser: state => state.authUser,
  // roleType: state => state.role_type
  // this is reconfiguration ...
  role_type: state => state.role_type ? state.role_type : localStorage.role_type ? localStorage.role_type : ''
}