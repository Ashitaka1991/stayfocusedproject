<template>
  <div class="register-main">
    <div class="register-area">
      <div class="register-title">Welcome</div>
      <el-form ref="registerForm" :model="registerInfo" label-width="80px">
        <el-form-item label="Nickname" prop="nickName" :rules="registerRules.nickName">
          <el-input v-model="registerInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email" :rules="registerRules.email">
          <el-input v-model="registerInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="Gender" required>
          <el-radio-group v-model="registerInfo.gender">
            <el-radio label="male"></el-radio>
            <el-radio label="female"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Birthday" prop="birthday"  :rules="registerRules.birthday">
          <el-date-picker type="date" placeholder="birthday" v-model="registerInfo.birthday" style="width:80%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Password" prop="password" :rules="registerRules.password">
          <el-input type="password" v-model="registerInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm('registerForm')">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data(){
    return {
      registerInfo : {
        nickName : '',
        email: '',
        gender: 'male',
        birthday: '',
        password: ''
      },
      registerRules : {
        nickName : [
          {required:true , message: 'Please input nickname',trigger: 'blur'},
          {min:5 , max:20 , message: '5 to 20 characters',trigger:'blur'}
        ],
        email : [
          {required:true , message: 'Please input e-mail address',trigger:'blur'},
          {type:'email' , message: 'Invalid e-mail address',trigger:['blur','change']}
        ],
        birthday : [
          { type: 'date',required:true, message: 'Please pick a date', trigger: 'change' }
        ],
        password : [
          {required:true , message: 'Please input password',trigger: 'blur'},
          {min:8 , max:20 , message: '8 to 20 characters',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    ...mapActions({
      registerAUser : 'registerANewUser'
    }),
    handleSubmitForm(formName){
      console.log('submit clicked');
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.registerAUser(this.registerInfo)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.register-main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-area{
    width: 80%;
    .register-title{
      width: 100%;
      height: 8vmin;
      font-size: 5vmin;
      font-weight: bold;
      color: #666;
    }
  }
}
</style>
