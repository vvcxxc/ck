export default {
  // this is reconfiguration ...
  role_type: state => state.role_type ? state.role_type : localStorage.role_type ? localStorage.role_type : ''
}