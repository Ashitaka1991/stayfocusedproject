export default {
  isUserAvailable : (state)=> !!(state.currentUser),
  isLoggedIn : (state) => {
    return !!(state.currentUser) ? state.currentUser.isOnlineUser : false
  },
  userHeadShot : (state) => {
    return !!(state.currentUser) ? state.currentUser.headShotGetter : ''
  },
  userName : (state) => {
    return !!(state.currentUser) ? state.currentUser.userNameGetter : ''
  },

  shultTimeSerials : (state) => {
    return !!(state.currentUser) ? state.currentUser.shultTimeSerialsGetter : []
  },
  shultTotalTimes : (state) => {
    return !!(state.currentUser) ? state.currentUser.shultRecordsGetter : []
  }
}
