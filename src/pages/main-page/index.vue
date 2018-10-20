<template>
  <div class="main-page-main">
    <div class="top-title-area">
      <div class="left-logo">Stay Focused</div>
      <div class="right-buttons">
        <router-link tag="div" :to="{name:'LoginPage'}" v-if="!isLoggedIn">Login</router-link>
        <div v-if="isLoggedIn" @click="logoutOnlineUser">Logout</div>
      </div>
      <div class="user-info-area" v-if="isUserUsable">
        <div class="head-shot">
          <img :src="headShot">
        </div>
        <div class="user-name">{{userName}}</div>
      </div>
    </div>
    <div class="cruiser-bar-area">
      <router-link tag="div" class="cruiser-bar" :to="{name:'ShultGrid'}">Shult Grid</router-link>
    </div>

    <router-view tag="div" class="sub-pages-view"></router-view>

    <div class="footer-area"></div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  methods:{
    ...mapActions({
      initLocalUser : 'initializeLocalUser',
      backupLocalUser : 'storeUserToLocalStorage',
      logoutOnlineUser : 'logoutAUser'
    })
  },
  computed:{
    ...mapGetters({
      isUserUsable : 'isUserAvailable',
      isLoggedIn : 'isLoggedIn',
      headShot : 'userHeadShot',
      userName : 'userName'
    })
  },
  created(){
    this.initLocalUser();
  },
  beforeDestroy(){
    this.backupLocalUser();
  }
}
</script>

<style scoped lang="less">
.main-page-main{
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  .top-title-area{
    width: 100%;
    height: 13vmin;
    /*background-color: green;*/
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: linear-gradient(to bottom, rgba(59,103,158,1) 0%,rgba(43,136,217,1) 82%,rgba(125,185,232,1) 100%,rgba(32,124,202,1) 100%,rgba(125,185,232,1) 100%);
    color: #ddd;
    border-radius: 5px;
    .left-logo{
      font-size: 6vmin;
      margin-top: 3vmin;
      margin-left: 3vmin;
      font-weight: bold;
      cursor: default;
    }
    .right-buttons{
      position: absolute;
      width: 6vmin;
      height: 3vmin;
      top: 1vmin;
      right: 1vmin;
      font-size: 2vmin;
      div{

      }
      div:hover{
        color: white;
        cursor: pointer;
      }
    }
    .user-info-area{
      position: absolute;
      width: 10vmin;
      height: 4vmin;
      bottom: 1vmin;
      right: 1vmin;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .head-shot{
        width: 3vmin;
        height: 3vmin;
        border-radius: 1.5vmin;
        overflow: hidden;
        border: solid 1px black;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .user-name{
        width: 6vmin;
        height: 3vmin;
        line-height: 3vmin;
        text-align: center;
        font-size: 1.5vmin;
        overflow: hidden;
        color: black;
      }
    }
  }
  .cruiser-bar-area{
    width: 100%;
    height: 6vmin;
    background: linear-gradient(to bottom, rgba(235,241,246,1) 0%,rgba(171,211,238,1) 9%,rgba(137,195,235,1) 100%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    .cruiser-bar{
      width: 15vmin;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #555;
      font-weight: bold;
      font-size : 2.5vmin;
      cursor : pointer;
    }
    .cruiser-bar:hover{

    }
  }
  .sub-pages-view{
    width: 100%;
    padding-bottom: auto;
    /*position: absolute;*/
    /*top: 19vmin;*/
    /*bottom: 10vmin;*/
  }
  .router-link-active{
    border-bottom: solid 4px royalblue;
  }
  .footer-area{
    width: 100%;
    height: 10vmin;
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: 0;*/
    background: linear-gradient(to bottom, rgba(235,241,246,1) 0%,rgba(171,211,238,1) 9%,rgba(137,195,235,1) 100%);
  }
}

</style>
