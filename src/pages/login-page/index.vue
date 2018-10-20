<template>
  <div class="login-main">
    <div class="login-form-area">
      <div class="qr-code-area" v-if="isWechatApproach" >
        <button @click="handleTestClicked">Test</button>
      </div>
      <div class="account-area" v-if="!isWechatApproach" @click="handleAccountClicked">
        <div class="account-title">Stay Focused</div>
        <div class="account-body">
          <div class="form-item">
            <input type="text" placeholder=" E-mail" v-model="loginInfo.account" class="input-item">
          </div>
          <div class="form-item">
            <input type="password" placeholder=" Password" name="login" v-model="loginInfo.password" class="input-item">
          </div>
          <div class="form-item">
            <input type="button" value="Login" class="submit-button" @click="handleFormSubmitted">
          </div>
          <div class="register-link">
            <router-link tag="div" class="link-item" :to="{name : 'RegisterPage'}">register</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="login-approach" v-if="false">
      <div :class="{'approach-item':true,'approach-item-active':isWechatApproach}" @click="handleWechatClicked">
        <img :src="wechatImg">
      </div>
      <div :class="{'approach-item':true,'approach-item-active':!isWechatApproach}" @click="handleAccountClicked">
        <img :src="accountImg">
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data(){
    return {
      wechatImg : require('static/images/login-icons/weichat-icon.png'),
      accountImg : require('static/images/login-icons/account-icon.png'),
      isWechatApproach : false,
      loginInfo : {
        account : '',
        password : ''
      }
    }
  },
  methods:{
    handleWechatClicked(){
      this.isWechatApproach = true;
    },
    handleAccountClicked(){
      this.isWechatApproach = false;
    },
    handleFormSubmitted(){

    },
    handleTestClicked(){
      console.log('clicked');

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
  .login-form-area{
    width: 40vmin;
    height: 40vmin;
    .qr-code-area{
      width: 100%;
      height: 100%;
      background-color: royalblue;
    }
    .account-area{
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(214,249,255,0.6) 0%,rgba(158,232,250,0.6) 100%);
      border-radius: 3px;
      overflow: hidden;
      .account-title{
        width: 100%;
        height: 7vmin;
        color: #ddd;
        font-size: 4vmin;
        background: linear-gradient(to bottom, rgba(59,103,158,1) 0%,rgba(43,136,217,1) 82%,rgba(125,185,232,1) 100%,rgba(32,124,202,1) 100%,rgba(125,185,232,1) 100%);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 5%;
      }
      .account-body{
        width: 100%;
        height: 33vmin;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        padding-top: 1.5vmin;
        .form-item{
          width: 85%;
          height: 7vmin;
          margin-top: 2vmin;
          .input-item{
            width: 100%;
            height: 80%;
            border: 1px solid;
            border-color: #c4c4c4 #d1d1d1 #d4d4d4;
            border-radius: 2px;
            outline: 5px solid #eff4f7;
            font-size: 3vmin;
          }
          .submit-button{
            width: 100%;
            height: 90%;
            border: 1px solid;
            border-color: #c4c4c4 #d1d1d1 #d4d4d4;
            background-color: #009dd8;
            color: #fff;
            background-image: linear-gradient(to bottom,#00b4f5,#008dc5);
            border-color: rgba(0,0,0,.2);
            border-bottom-color: rgba(0,0,0,.4);
            text-shadow: 0 -1px 0 rgba(0,0,0,.2);
            font-size: 3.5vmin;
          }
        }
        .register-link{
          width: 85%;
          height: 3vmin;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 1vmin;
          .link-item{
            width: 50%;
            height: 100%;
            font-size: 1.5vmin;
            color: deepskyblue;
          }
          .link-item:hover{
            color: royalblue;
            cursor: pointer;
          }
        }
      }
    }
  }
  .login-approach{
    width: 45vmin;
    height: 8vmin;
    margin-top: 3vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    .approach-item{
      width: 8vmin;
      height: 8vmin;
      border-radius: 4vmin;
      margin: 0 1vmin;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .approach-item:hover{
      width: 8.2vmin;
      height: 8.2vmin;
    }
    .approach-item-active{
      img{
        background: linear-gradient(to bottom, rgba(214,249,255,0.6) 0%,rgba(158,232,250,0.6) 100%);
        border: 1px solid rgba(16,80,165,0.19);
        box-shadow: 0 0 15px 0 #1C5AAC;
      }
    }
  }
}
</style>
