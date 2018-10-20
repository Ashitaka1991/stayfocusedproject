import * as d3 from 'd3'

export const D3CurveMixin = {
  methods: {
    convertIndexToColor(idx){
      let lLimit = 10;
      let hLimit = 300;
      let h = idx*50;
      if(h < lLimit){
        h = lLimit
      }
      else if(h > hLimit){
        h = h%hLimit;
      }

      return d3.hsl(hLimit - h,0.7,0.7).rgb().toString();
    },

    getFigures(className) {
      let rect = d3.select(className).node().getBoundingClientRect();
      let margin = 6;
      let width = rect.width;
      let height = rect.height;
      let sWidth = width - margin * 2;
      let sHeight = height - margin * 2;
      return {width, height, sWidth, sHeight, margin};
    },
    createPlotArea(className, width, height, margin) {
      let svg = d3.select(className).append('svg')
        .attr('width', width)
        .attr('height', height);
      return svg.append('g')
        .attr('transform', 'translate(' + margin + ',' + margin + ')');

    },
    createXScaleAndAxis(chart, max, ticks, tickSize, sWidth, sHeight) {
      let xScale = d3.scaleLinear()
        .domain([0, max])
        .range([0, sWidth]);
      let axis = d3.axisTop(xScale).ticks(ticks).tickSize(tickSize);
      let xAxisInstance = chart.append('g')
        .attr('transform', 'translate(0,' + sHeight + ')')
        .call(axis);

      return {xScale, xAxisInstance};
    },
    createYScaleAndAxis(chart, max, ticks, tickSize, sWidth, sHeight) {
      let yScale = d3.scaleLinear()
        .domain([0, max])
        .range([sHeight, 0]);
      let axis = d3.axisRight(yScale).ticks(ticks).tickSize(tickSize);
      let yAxisInstance = chart.append('g')
        .call(axis);

      return {yScale, yAxisInstance};
    },
    decorateVerticalXAxis(xInstance){

    },
    decorateVerticalYAxis(yInstance){

    },


  }
};
