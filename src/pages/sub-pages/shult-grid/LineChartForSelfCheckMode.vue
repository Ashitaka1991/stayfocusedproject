<template>
  <div class="line-chart-for-self-check-mode-main">

  </div>
</template>

<script>
import * as d3 from 'd3'
import {D3CurveMixin} from "../mixins/D3CurveMixin";

export default {
  props:{
    dimensions : {
      type : Number,
      required : true
    },
    currentTime : {
      type : Number,
      required : true
    },
    historyTimes : {
      type : Array,
      required : false
    }
  },
  mixins : [D3CurveMixin],
  data(){
    return {
      vChart: null,
      vXScale: null,
      vYScale: null,
      lineGenerator : null,
      historyTimesByDimensions : []
    }
  },
  methods:{
    initializeChart(className){
      let dimSquare = this.dimensions*this.dimensions;
      let {width,height,sWidth,sHeight,margin} = this.getFigures(className);
      this.vChart = this.createPlotArea(className,width,height,margin);

      let xss,yss;
      if(this.historyTimes.length < 5){
        xss = 5;
      }
      else{
        xss = this.historyTimes.length + 1;
      }

      this.historyTimesByDimensions.push(this.currentTime)
      yss = Math.ceil((d3.max(this.historyTimesByDimensions) + 500)/1000);

      let {xScale,xAxisInstance} = this.createXScaleAndAxis(this.vChart,xss,5,5,sWidth,sHeight);
      this.vXScale = xScale;
      let {yScale,yAxisInstance} = this.createYScaleAndAxis(this.vChart,yss,8,5,sWidth,sHeight);
      this.vYScale = yScale;
      this.lineGenerator = this.createALineGenerator(xScale,yScale);

      this.decorateXAxis(xAxisInstance);
      this.decorateYAxis(yAxisInstance);



      if(this.historyTimesByDimensions.length > 0){
        this.drawCurrentPoint(this.vChart,xScale,yScale,this.historyTimesByDimensions.length-1,(this.currentTime/1000))
        this.drawHistoryLine(this.vChart,xScale,yScale,this.lineGenerator,this.historyTimesByDimensions,(this.currentTime/1000))
      }
      else{
        this.drawCurrentPoint(this.vChart,xScale,yScale,1,(this.currentTime/1000))

      }
    },
    decorateXAxis(xInst){
      xInst.selectAll('g').each(function(d,i){
        let tg = d3.select(this);
        let tt = tg.select('text');
        if(!tt.empty()){
          let ti = parseInt(tt.text());
          if(ti===0){
            tt.remove();
          }
        }
      });
    },
    decorateYAxis(yInst) {
      yInst.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '3.5em')
        .style('text-anchor', 'end')
        .text('Total-Time(s)')
        .attr('fill', 'white')

      yInst.selectAll('g').each(function (d, i) {
        let tg = d3.select(this);
        let tt = tg.select('text');
        if (!tt.empty()) {
          let ti = parseInt(tt.text());
          if (ti === 0) {
            tg.remove();
          }
        }
      });
    },
    drawCurrentPoint(chart,xS,yS,x,y){
      chart.append('circle')
        .attr('class','current-circle')
        .attr('cx',xS(x))
        .attr('cy',yS(y))
        .attr('r',3)
        .attr('stroke','red')
        .attr('stroke-width',1)
        .attr('fill','red')
    },
    drawHistoryLine(chart,xS,yS,generator,yps,cy){
      let ps = yps.map((y,i)=>{
        return [i,y/1000]
      })

      chart.append('path')
        .attr('class','history-line')
        .data([ps])
        .attr('d',generator)
        .attr('fill','none')
        .attr('stroke','red')
        .attr('stroke-width',1);


    },
    createALineGenerator(xS,yS){
      return d3.line()
        .curve(d3.curveLinear)
        .x((d)=>xS(d[0]))
        .y((d)=>yS(d[1]))
    }
  },
  mounted(){
    this.historyTimesByDimensions = this.historyTimes.filter((record)=>{
      return record.dimensions === this.dimensions
    }).map((record)=>{
      return record.time;
    });
    this.initializeChart('.line-chart-for-self-check-mode-main')
  }

}
</script>

<style scoped lang="less">
.line-chart-for-self-check-mode-main{
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(55,56,55,0.9) 0%,rgba(14,14,14,0.9) 100%);

}
</style>
