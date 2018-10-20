import LocalUser from './reusable-classes/user-classes/LocalUser'
import OnlineUser from './reusable-classes/user-classes/OnlineUser'

export default {
  generateALocalUser(state,id){
    let user = JSON.parse(sessionStorage.getItem('currentUser'))

    if(user && user.oneTimeId === id){
      if(!user.onlineFlag){
        let tusr = new LocalUser(id)
        tusr.name = user.name
        tusr.userId = user.userId
        tusr.gender = user.gender
        tusr.onlineFlag = user.onlineFlag
        tusr.shultTimeSerials = user.shultTimeSerials
        tusr.shultRecords = user.shultRecords
        tusr.oneTimeId = user.oneTimeId
        state.currentUser = tusr
      }
      else{
        let tusr = new OnlineUser({nickName:'',gender:'',userid:0,tempid:0})
        tusr.name = user.name
        tusr.userId = user.userId
        tusr.gender = user.gender
        tusr.onlineFlag = user.onlineFlag
        tusr.shultTimeSerials = user.shultTimeSerials
        tusr.shultRecords = user.shultRecords
        tusr.oneTimeId = user.oneTimeId
        state.currentUser = tusr
      }
    }
    else{
      state.currentUser = new LocalUser(id)
      sessionStorage.removeItem('currentUser')
      sessionStorage.setItem('currentUser',JSON.stringify(state.currentUser))
    }
  },

  generateAnOnlineUser(state,info){
    state.currentUser = new OnlineUser(info)
    sessionStorage.removeItem('currentUser')
    sessionStorage.setItem('currentUser',JSON.stringify(state.currentUser))

  },

  setShultTimeSerialsOnce(state,serials){
    state.currentUser.shultTimeSerialsSetter = serials;
    sessionStorage.removeItem('currentUser')
    sessionStorage.setItem('currentUser',JSON.stringify(state.currentUser))
  },
  setShultRecordOnce(state,record){
    state.currentUser.shultRecordSetter = record;
    sessionStorage.removeItem('currentUser')
    sessionStorage.setItem('currentUser',JSON.stringify(state.currentUser))
  }
}
