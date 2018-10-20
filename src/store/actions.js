import qs from 'qs'
import router from '../router'

export default {
  registerANewUser(store,registerInfo){
    this._vm.$http.post('/register',qs.stringify(registerInfo))
      .then((res)=>{
        if(res.data.type === 1){
          this._vm.$message('Register successfully!')
          router.replace({name : 'LoginPage'})
        }
        else{
          console.log(res.data.describe)
          this._vm.$alert('Register failed','Warning',{
            confirmButtonText : 'Confirm'
          })
        }
      })
      .catch((err)=>{
        this._vm.$alert('Network Error','Warning',{
          confirmButtonText : 'Confirm'
        })
      })
  },

  loginAUser(store,loginInfo){
    this._vm.$http.post('/login',qs.stringify(loginInfo))
      .then((res)=>{
        if(res.data.type === 1){
          store.commit('generateAnOnlineUser',res.data)
          this._vm.$message('Login successfully!')
          router.replace({name : 'MainPage'})
        }
        else{
          this._vm.$alert('Login Error','Warning',{
            confirmButtonText : 'Confirm'
          })
        }
      })
      .catch((err)=>{
        this._vm.$alert('Network Error','Warning',{
          confirmButtonText : 'Confirm'
        })
      })
  },

  logoutAUser(store){
    this._vm.$http.get('/logout')
      .then((res)=>{
        if(res.data.type === 1){
          sessionStorage.removeItem('currentUser')
          store.commit('generateALocalUser',res.data.tempid)
          router.replace({name : 'MainPage'})
          this._vm.$message('Logout successfully!')
        }
        else{
          this._vm.$alert('Logout Error','Warning',{
            confirmButtonText : 'Confirm'
          })
        }
      })
  },


  initializeLocalUser(store){
    // console.log('initialize local user');
    if(!store.state.currentUser){
      this._vm.$http.get('/init')
        .then((res)=>{
            store.commit('generateALocalUser',res.data.tempid);
        })
    }
    // store.commit('generateALocalUser',10000000);
  },

  storeUserToLocalStorage(store){
    console.log('before destroyed store local data')
  },

  updateShultTimeSerialsOnce(store,serials){
    store.commit('setShultTimeSerialsOnce',serials)
    let user = store.state.currentUser
    if(user.isOnlineUser){
      let uploadData = {
        userid : user.userIdGetter,
        dimensions : Math.round(Math.sqrt(serials.length)),
        serials : serials.toString()
      }
      this._vm.$http.post('/shult/serials',qs.stringify(uploadData))
        .then((res)=>{
          if(res.data.type === 1){
            this._vm.$message('Upload successfully!')
          }
        })
    }
  },

  updateShultRecordOnce(store,record){
    store.commit('setShultRecordOnce',record)
    let user = store.state.currentUser
    if(user.isOnlineUser){
      let uploadData = {
        userid : user.userIdGetter,
        dimensions : record.dimensions,
        record : record.time
      }

      this._vm.$http.post('/shult/record',qs.stringify(uploadData))
        .then((res)=>{
          if(res.data.type === 1){
            this._vm.$message('Upload successfully!')
          }
        })
    }
  }

}
