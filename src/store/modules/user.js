import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,asyncRouters,anyRoutes,constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    roles:[],
    buttons:[],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes:[],
    //用户最终需要展示的全部路由
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

//唯一修改state的地方
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO:(state,userInfo)=>{
    state.name=userInfo.name
    state.avatar=userInfo.avatar
    state.routes=userInfo.routes
    state.buttons=userInfo.buttons
    state.roles=userInfo.roles
  },
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    //vuex保存当前用户的异步路由，注意：一个用户需要展示完成路由：常量、异步、任意路由
    state.resultAsyncRoutes=asyncRoutes
    //计算出当前用户需要展示所有路由
    state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    //给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

//定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes=(asyncRouters,routes)=>{
  //过滤出当前用户【超级管理｜普通员工】需要展示的异步路由
  return asyncRouters.filter(item=>{
    if(routes.indexOf(item.name)!=-1){
      //递归：别忘记还有多级子路由需要过滤
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes)
      }
      return true
    }
  })
}

const actions = {
  // user login,处理登陆业务
  async login({ commit }, userInfo) {
    //结构出用户名与密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    //注意：当前登陆请求现在使用mock数据，mock数据code是20000
    if(result.code==20000){
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRouters,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

