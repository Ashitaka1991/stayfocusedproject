import User from './User'

class LocalUser extends User{
  constructor(id){
    super();
    this.name = 'Tourist';
    this.oneTimeId = id;
  }




}

export default LocalUser;
