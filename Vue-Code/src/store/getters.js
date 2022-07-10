const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.admin.token,
  avatar: state => state.admin.avatar,
  login: state => state.admin.login,
  id: state => state.admin.id,
  author:state=>state.admin.author,
  pwd: state => state.admin.pwd,
  thingtype:state=>state.config.thingtype,
  thingtype2:state=>state.config.thingtype2
}
export default getters
