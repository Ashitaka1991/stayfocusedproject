<template>
  <div class="line-chart-for-click-mode-main">

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
    currentTimes : {
      type : Array,
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
      lineGenerator : null
    }
  },
  methods:{
    initializeChart(className){
      let dimSquare = this.dimensions*this.dimensions;
      let {width,height,sWidth,sHeight,margin} = this.getFigures(className);
      this.vChart = this.createPlotArea(className,width,height,margin);
      let {xScale,xAxisInstance} = this.createXScaleAndAxis(this.vChart,dimSquare+1,dimSquare+1,5,sWidth,sHeight);
      this.vXScale = xScale;
      let {yScale,yAxisInstance} = this.createYScaleAndAxis(this.vChart,8,8,5,sWidth,sHeight);
      this.vYScale = yScale;
      this.lineGenerator = this.createALineGenerator(xScale,yScale);

      this.decorateXAxis(xAxisInstance);
      this.decorateYAxis(yAxisInstance);

      if(!!this.historyTimes && this.historyTimes.length > 0){
        this.historyTimes.forEach((data,idx)=>{
          let clr = this.convertIndexToColor(idx)
          this.drawALine(this.vChart,data,this.lineGenerator,clr)
        })

        this.drawAnAverageLine(this.vChart,this.historyTimes,xScale,yScale)
      }

      this.drawCurrentLine(this.vChart,this.currentTimes,this.lineGenerator,'#f00',xScale,yScale);

    },
    decorateXAxis(xInst){
      let interval = Math.round(this.dimensions*this.dimensions/5)

      xInst.selectAll('g').each(function(d,i){
        let tg = d3.select(this);
        let tt = tg.select('text');
        if(!tt.empty()){
          let ti = parseInt(tt.text());
          if(ti===0 || ti%interval !==0){
            tt.remove();
          }
        }
      });
    },
    decorateYAxis(yInst){
      yInst.append('text')
        .attr('transform','rotate(-90)')
        .attr('y',6)
        .attr('dy','2em')
        .style('text-anchor','end')
        .text('Speed(n/s)')
        .attr('fill','white')

      yInst.selectAll('g').each(function(d,i){
        let tg = d3.select(this);
        let tt = tg.select('text');
        if(!tt.empty()){
          let ti = parseInt(tt.text());
          if(ti===0){
            tg.remove();
          }
        }
      });

      // chart.append('text')
      //   .attr('fill','white')
      //   .attr('font-size','32px')
      //   .attr('text-anchor','left')
      //   .attr('x',0)
      //   .attr('y',0)
      //   .attr('dx',10)
      //   .attr('dy',10)
      //   .attr('text','speed(n/s)')
    },
    drawCurrentLine(chart,data,generator,color,xS,yS){
      let intervals = data.map((val,i)=>{
        return (i === 0) ? (1000/val) : (1000/(val - data[i-1]))
      });
      let avrSpd = d3.mean(intervals);
      intervals = intervals.map((val,i)=>{
        return [i+1,val]
      });
      chart.append('path')
        .data([intervals])
        .attr('class','current-line')
        .attr('d',generator)
        .attr('fill','none')
        .attr('stroke',color)
        .attr('stroke-width',2);

      chart.append('line')
        .attr('class','current-average')
        .attr('x1',xS(0))
        .attr('y1',yS(avrSpd))
        .attr('x2',xS(this.dimensions*this.dimensions + 1))
        .attr('y2',yS(avrSpd))
        .attr('stroke',color)
        .attr('stroke-dasharray','5,5')
        .attr('stroke-width',2);

      intervals.forEach((point)=>{
        chart.append('circle')
          .attr('class','current-point')
          .attr('cx',xS(point[0]))
          .attr('cy',yS(point[1]))
          .attr('r',2)
          .attr('stroke',color)
          .attr('stroke-width',1)
          .attr('fill','#222')

      })

    },
    drawALine(chart,data,generator,color){
      let intervals = data.map((val,i)=>{
        return (i === 0) ? (1000/val) : (1000/(val - data[i-1]))
      });
      intervals = intervals.map((val,i)=>{
        return [i+1,val]
      });
      chart.append('path')
        .data([intervals])
        .attr('class','current-line')
        .attr('d',generator)
        .attr('fill','none')
        .attr('stroke',color)
        .attr('stroke-width',1);
    },
    drawAnAverageLine(chart,data,xS,yS){
      let avrArr = data.map((times)=>{
        let intervals = times.map((val,i)=>{
          return (i === 0) ? (1000/val) : (1000/(val - times[i-1]))
        });

        return d3.mean(intervals)
      })
      let avr = d3.mean(avrArr)

      /******************************************************/
      let bColor = this.convertIndexToColor(0)
      let mColor = this.convertIndexToColor(Math.round(data.length/2))
      let eColor = this.convertIndexToColor(data.length-1)

      let defs = chart.append('defs')
        .attr('class','ball-defs');
      let gradient = defs.append('linearGradient')
        .attr('id','avgGradient')
        .attr('x1','0%')
        .attr('y1','0%')
        .attr('x2','100%')
        .attr('y2','0%')
        .attr('gradientUnits','userSpaceOnUse');
      gradient.append('stop')
        .attr('offset','0%')
        .attr('stop-color',bColor);
      gradient.append('stop')
        .attr('offset','50%')
        .attr('stop-color',mColor);
      gradient.append('stop')
        .attr('offset','100%')
        .attr('stop-color',eColor);

      chart.append('line')
        .attr('class','history-average')
        .attr('x1',xS(0))
        .attr('y1',yS(avr))
        .attr('x2',xS(this.dimensions*this.dimensions + 1))
        .attr('y2',yS(avr))
        .attr('stroke','url(#avgGradient)')
        .attr('stroke-dasharray','5,5')
        .attr('stroke-width',2);
    },
    createALineGenerator(xS,yS){
      return d3.line()
        .curve(d3.curveCardinal)
        .x((d)=>xS(d[0]))
        .y((d)=>yS(d[1]))
    }
  },
  mounted(){
    this.initializeChart('.line-chart-for-click-mode-main')
  }
}
</script>

<style scoped lang="less">
.line-chart-for-click-mode-main{
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(55,56,55,0.9) 0%,rgba(14,14,14,0.9) 100%);
}
</style>
