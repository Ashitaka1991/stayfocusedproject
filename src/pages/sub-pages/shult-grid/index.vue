<template>
  <div class="shult-gird-main">
    <mask-bg v-if="shultStates.isStartClicked || shultStates.isStatisticsShown">
      <div slot="centralArea" v-if="shultStates.isStartClicked">start in {{shultTimeCount}}s...</div>
      <div slot="centralArea" v-if="shultStates.isStatisticsShown" class="statistics-area">
        <div class="stats-title">Time usage : {{milliSecConverter}}</div>
        <div class="stats-chart">
          <line-chart-click v-if="shultStates.isClickedMode"
                            :dimensions="shultStates.dimensions"
                            :current-times="shultStates.clickedTimes"
                            :history-times="historySerials"></line-chart-click>
          <line-chart-self v-if="!shultStates.isClickedMode"
                           :dimensions="shultStates.dimensions"
                           :current-time="shultMilliSec"
                           :history-times="historyRecords"></line-chart-self>
        </div>
        <div class="stats-buttons" v-if="shultStates.isClickedMode">
          <el-button type="primary" style="width: 25%;" @click="handleConfirmFinishClicked">Finish</el-button>
          <el-button type="primary" style="width: 25%;" @click="handleConfirmStartClicked">Start</el-button>
        </div>
        <div class="stats-buttons" v-if="!shultStates.isClickedMode">
          <el-button type="primary" style="width: 25%;" @click="handleConfirmFinishInSelfModeClicked">Finish</el-button>
          <el-button type="primary" style="width: 25%;" @click="handleConfirmStartInSelfModeClicked">Start</el-button>
        </div>
      </div>
    </mask-bg>

    <div :class="{'options-area':true,'options-inactive':shultStates.isPlaying}">
      <div class="mode-button">
        <div :class="{'switch-text':true , 'active-text': !shultStates.isClickedMode}">Self<br>Check</div>
        <el-switch v-model="shultStates.isClickedMode">
        </el-switch>
        <div :class="{'switch-text':true , 'active-text': shultStates.isClickedMode}">Click<br>Mode</div>

      </div>
      <div :class="{'option-item':true , 'option-item-active': shultStates.dimensions === 3}">
        <div class="option-icon grid3-icon" @click="handleDimensionClicked(3)">
        </div>
        <span class="option-title">3x3</span>
      </div>
      <div :class="{'option-item':true , 'option-item-active': shultStates.dimensions === 4}">
        <div class="option-icon grid4-icon" @click="handleDimensionClicked(4)">
        </div>
        <span class="option-title">4x4</span>
      </div>
      <div :class="{'option-item':true , 'option-item-active': shultStates.dimensions === 5}">
        <div class="option-icon grid5-icon" @click="handleDimensionClicked(5)">
        </div>
        <span class="option-title">5x5</span>
      </div>
      <div :class="{'option-item':true , 'option-item-active': shultStates.dimensions === 6}">
        <div class="option-icon grid6-icon" @click="handleDimensionClicked(6)">
        </div>
        <span class="option-title">6x6</span>
      </div>
    </div>

    <div :class="{'shult-gird' : true,
                  'shult-grid3x3' : shultStates.dimensions === 3,
                  'shult-grid4x4' : shultStates.dimensions === 4,
                  'shult-grid5x5' : shultStates.dimensions === 5,
                  'shult-grid6x6' : shultStates.dimensions === 6,}" ref="shultGrid">
      <div v-for="item in shultStates.blocks"
           :class="{'shult-block':true , 'shult-block-clicked': shultStates.clickedSequence.indexOf(item) >= 0}"
           @click="handleBlockClicked(item)">{{item}}</div>

    </div>

    <div class="timer-area">
      <el-button v-if="!shultStates.isPlaying" type="primary" style="width: 100%; height: 100%; font-size: 3.5vmin;" @click="handleStartClicked">Start</el-button>
      <el-button v-if="shultStates.isPlaying" type="success" style="width: 100%; height: 100%; font-size: 3.5vmin;" @click="handleFinishClickedThroughModes">{{milliSecConverter}}</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

import MaskBg from './MaskBg'
import LineChartClick from './LineChartForClickMode'
import LineChartSelf from './LineChartForSelfCheckMode'

export default {
  components : {
    maskBg : MaskBg,
    lineChartClick : LineChartClick,
    lineChartSelf : LineChartSelf
  },
  data(){
    return {
      shultStates : {
        isClickedMode : true,
        isStartClicked : false,
        isStatisticsShown : false,
        isPlaying : false,
        dimensions : 4,
        blocks : [],
        clickedTimes : [],
        clickedSequence : []
      },
      shultTimeCount : 5,
      shultMilliSec: 0,
      shultTimerHandler : null,
    }
  },
  computed:{
    ...mapGetters({
      historySerials : 'shultTimeSerials',
      historyRecords : 'shultTotalTimes',
    }),
    milliSecConverter(){
      let milli = this.shultMilliSec%1000;
      let sec = (Math.floor(this.shultMilliSec/1000))%60;
      let min = Math.floor(this.shultMilliSec/60000);

      return (('00' + min).slice(-2) + ':' + ('00' + sec).slice(-2) + ':' + (milli + '00').slice(0,2))
    }
  },
  methods:{
    ...mapActions({
      uploadTimeSequence : 'updateShultTimeSerialsOnce',
      uploadTimeRecord : 'updateShultRecordOnce'
    }),
    handleDimensionClicked(dim){
      if(this.shultStates.dimensions !== dim){
        this.shultStates.dimensions = dim
        this.shultStates.blocks = this.generateSequenceArray(dim)
      }
    },
    generateSequenceArray(dim){
      return [...Array(dim*dim+1).keys()].slice(1);
    },
    randomArray(array){
      array.sort((a,b)=>{
        return (Math.random() > .5) ? -1 : 1
      })
    },
    handleStartClicked(){
      this.shultStates.isStartClicked = true;
      this.shultCountDown(5)
    },
    handleFinishClicked(){
      clearInterval(this.shultTimerHandler)
      // this.shultStates.isPlaying = false
      this.shultStates.isStatisticsShown = true
    },
    handleFinishClickedThroughModes(){
      if(this.shultStates.isClickedMode){

      }
      else{
        this.handleFinishClicked()
      }
    },
    handleKeyDown(e){
      if(!this.shultStates.isClickedMode && this.shultStates.isPlaying && (e.keyCode === 13 || e.keyCode === 32)){
        this.handleFinishClicked()
      }
    },
    handleConfirmStartInSelfModeClicked(){
      this.handleConfirmFinishInSelfModeClicked()
      this.handleStartClicked()
    },
    handleConfirmFinishInSelfModeClicked(){
      this.uploadTimeRecord({time:this.shultMilliSec,dimensions:this.shultStates.dimensions})

      this.shultStates.isPlaying = false;
      this.shultStates.isStatisticsShown = false;
      this.shultMilliSec = 0;
      this.shultStates.blocks = this.generateSequenceArray(this.shultStates.dimensions)
    },
    handleBlockClicked(num){
      if(this.shultStates.isClickedMode){
        let seqArr = this.shultStates.clickedSequence
        let timeArr = this.shultStates.clickedTimes
        let dimSquare = this.shultStates.dimensions*this.shultStates.dimensions
        if(this.shultStates.isPlaying){
          if(seqArr.length === 0){
            if(num === 1 || num === dimSquare){
              timeArr.push(this.shultMilliSec)
              seqArr.push(num)
            }
          }
          else{
            if((num === seqArr[seqArr.length-1] + 1) || (num === seqArr[seqArr.length-1] - 1)){
              timeArr.push(this.shultMilliSec)
              seqArr.push(num)
            }
          }
        }

        if(seqArr.length === dimSquare){
          this.handleFinishClicked();
        }
      }
      else{

      }

    },
    handleConfirmFinishClicked(){
      this.uploadTimeSequence(this.shultStates.clickedTimes);

      this.shultStates.isPlaying = false;
      this.shultStates.isStatisticsShown = false;
      this.shultStates.clickedSequence = [];
      this.shultStates.clickedTimes = [];
      this.shultMilliSec = 0;
      this.shultStates.blocks = this.generateSequenceArray(this.shultStates.dimensions)
    },
    handleConfirmStartClicked(){
      this.handleConfirmFinishClicked();
      this.handleStartClicked()
    },
    shultCountDown(count){
      if(count === 0){
        this.randomArray(this.shultStates.blocks);
        this.shultTimerHandler = setInterval(()=>{
          this.shultMilliSec += 100;
        },100);
        this.shultStates.isStartClicked = false;
        this.shultStates.isPlaying = true;
        this.shultTimeCount = 5
      }
      else{
        setTimeout(()=>{
          this.shultTimeCount = (count - 1)
          this.shultCountDown(count-1)
        },1000)
      }
    }
  },
  mounted(){
    this.shultStates.blocks = this.generateSequenceArray(this.shultStates.dimensions)

    document.onkeydown = this.handleKeyDown
  },
  beforeDestroy(){
    clearInterval(this.shultTimerHandler)
  }
}
</script>

<style scoped lang="less">
.shult-gird-main{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to bottom, rgba(214,249,255,0.6) 0%,rgba(158,232,250,0.6) 100%);
  .statistics-area{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    .stats-title{
      width: 100%;
      height: 5vmin;
      font-size: 3vmin;
    }
    .stats-chart{
      width: 100%;
      height: 45vmin;
      border-radius: 8px;
      overflow: hidden;
    }
    .stats-buttons{
      width: 100%;
      height: 6vmin;
    }
  }

  .options-inactive{
    pointer-events: none;
  }
  .options-area{
    width: 80%;
    height: 5vmin;
    margin: 3vmin 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .option-item{
      width: 12%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .option-icon{
        width: 4.5vmin;
        height: 4.5vmin;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
      .grid3-icon{
        background-image: url(~static/images/shult-icons/grid3.png);
      }
      .grid4-icon{
        background-image: url(~static/images/shult-icons/grid4.png);
      }
      .grid5-icon{
        background-image: url(~static/images/shult-icons/grid5.png);
      }
      .grid6-icon{
        background-image: url(~static/images/shult-icons/grid6.png);
      }
      .option-title{
        margin-left: 3px;
        font-size: 1vmin;
      }
    }
    .option-item:hover{
      cursor: pointer;
    }
    .option-item-active{
      color: deepskyblue;
      font-weight: bold;
      .option-icon{
        border: 1px solid rgba(16,80,165,0.19);
        box-shadow: 0 0 3px 0 #1C5AAC;
      }
    }
    .mode-button{
      width: 15%;
      height: 100%;
      margin-right: 3%;
      display: flex;
      justify-content: center;
      align-items: center;
      .switch-text{
        font-size : 1vmin;
        color: silver;
      }
      .active-text{
        color: deepskyblue;
      }
    }
  }
  .shult-gird{
    width: 75vmin;
    height: 75vmin;
    background: linear-gradient(to bottom, rgba(125,126,125,0.8) 0%,rgba(14,14,14,0.8) 100%);
    border: 1px solid #808B95;
    box-shadow: 0 0 8px 0 #888;
    display: grid;
    grid-gap: 5px;

    .shult-block{
      width: 100%;
      height: 100%;
      justify-self: center;
      align-self: center;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial;
      color: #ddd;
      background: linear-gradient(to bottom, rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);
      user-select: none;
    }
    .shult-block:hover{
      color: #fff;
      cursor : pointer;
    }
    .shult-block-clicked{
      color: #888;
      opacity: 0.6;
    }
  }
  .shult-grid3x3{
    grid-template-columns : 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    font-size: 16vmin;
  }
  .shult-grid4x4{
    grid-template-columns : 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    font-size: 12vmin;
  }
  .shult-grid5x5{
    grid-template-columns : 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    font-size: 9vmin;
  }
  .shult-grid6x6{
    grid-template-columns : 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    font-size: 6vmin;
  }
  .timer-area{
    width: 30vmin;
    height: 9vmin;
    margin: 5vmin 0;
  }
}

</style>
