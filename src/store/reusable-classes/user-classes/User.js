class User{
  constructor(){
    this.name = ''
    this.userId = -1
    this.gender = ''
    this.onlineFlag = false
    this.shultTimeSerials = []
    this.shultRecords = []
    this.oneTimeId = 0
  }

  get userNameGetter(){
    return this.name
  }
  get userIdGetter(){
    return this.userId
  }
  get isOnlineUser(){
    return this.onlineFlag
  }
  get headShotGetter(){
    if(this.gender === 'male'){
      return require('static/images/main-icons/profile-male.png')
    }
    else if(this.gender === 'female'){
      return require('static/images/main-icons/profile-female.png')
    }
    else{
      return require('static/images/main-icons/profile-user.png')
    }
  }
  get shultTimeSerialsGetter(){
    if(this.shultTimeSerials.length > 10){
      return this.shultTimeSerials.slice(-10)
    }
    else{
      return this.shultTimeSerials
    }
  }
  get shultRecordsGetter(){
    return this.shultRecords
  }
  get oneTimeIdGetter(){
    return this.oneTimeId;
  }

  set shultTimeSerialsSetter(serials){
    this.shultTimeSerials.push(serials)
    this.shultRecords.push(serials[serials.length-1])
  }
  set shultRecordSetter(record){
    this.shultRecords.push(record)
  }

}

export default User
