import User from './User'

class OnlineUser extends User{
  constructor(info){
    super();
    this.name = info.nickName;
    this.gender = info.gender;
    this.userId = info.userid;
    this.oneTimeId = info.tempid;

    this.onlineFlag = true;
  }
}

export default OnlineUser;
