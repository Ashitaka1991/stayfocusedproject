<template>
  <div class="login-main">
    <div class="login-area">
      <div class="login-title">Stay Focused</div>
      <div class="login-body">
        <el-form ref="loginForm" :model="loginInfo">
          <el-form-item prop="email" :rules="loginRules.email">
            <el-input v-model="loginInfo.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="loginRules.password">
            <el-input type="password" v-model="loginInfo.password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="handleSubmitForm('loginForm')">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="register-link">Don't have an account? &nbsp <router-link :to="{name:'RegisterPage'}">Register Now</router-link></div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data(){
    return{
      loginInfo : {
        email : '',
        password : ''
      },
      loginRules : {
        email : [
          {required:true , message: 'Please input e-mail address',trigger:'blur'},
          {type:'email' , message: 'Invalid e-mail address',trigger:['blur','change']}
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
      loginUser : 'loginAUser'
    }),
    handleSubmitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          console.log('valid input,ready to login')
          this.loginUser(this.loginInfo)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-area{
    width: 40vmin;
    height: 32vmin;
    min-width: 300px;
    min-height: 240px;
    background: linear-gradient(to bottom, rgba(214,249,255,0.6) 0%,rgba(158,232,250,0.6) 100%);
    border-radius: 3px;
    overflow: hidden;
    .login-title{
      width: 100%;
      height: 7vmin;
      min-height: 40px;
      color: #ddd;
      font-size: 4vmin;
      background: linear-gradient(to bottom, rgba(59,103,158,1) 0%,rgba(43,136,217,1) 82%,rgba(125,185,232,1) 100%,rgba(32,124,202,1) 100%,rgba(125,185,232,1) 100%);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 5%;
    }
    .login-body{
      width: 32vmin;
      height: 25vmin;
      margin-left: 4vmin;
      margin-top: 3vmin;
      min-width: 240px;
      min-height: 180px;
    }
  }
  .register-link{
    width: 100%;
    height: 3vmin;
    min-height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vmin;
  }
}
</style>
