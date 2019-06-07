import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
	/**
	 * chartData   array required
	 * chartWidth  int   optional
	 * chartHeight int   optional
	 *
	 */
	constructor(props) {
	    super(props);

	    this.state = {
	      chartWidth: typeof props.chartWidth != 'undefined' ? props.chartWidth : 700,
	      chartHeight: typeof props.chartHeight != 'undefined' ? props.chartHeight : 300,
	      // chartID: typeof props.chartID != 'undefined' ? props.chartID : 1
	    };
	  }

	componentDidMount() {
		this.drawChart();
	}

	drawChart() {
		console.log(this.props.chartData)
		d3.select("svg").remove()

		const data = this.props.chartData;
		const w = this.state.chartWidth
		const h = this.state.chartHeight
		// create frame (I thiiiiiiiink...)
		const svg = d3.select("#chart")
		    .append("svg")
		    .attr("width", w)
		    .attr("height", h)
		    .style("margin-left", 100);
	      
	      // place data
	    // svg.append("a").attr("xlink:href", (d, i) => d.ID)
	    svg.selectAll("rect")
	      .data(data)
	      .enter()
	      .append("a").attr("xlink:href", (d, i) => `points/${d.ID}`)
	      .append("rect")
	      .attr("x", (d, i) => i * 70)
	      .attr("y", (d, i) => h - 10 * d.value)
	      .attr("width", 65)
	      .attr("height", (d, i) => d.value * 10)
	      .attr("fill", "green")

	      // label
	    svg.selectAll("text")
		  .data(data)
		  .enter()
		  .append("a").attr("xlink:href", (d, i) => `points/${d.ID}`)
		  .append("text")
		  .text((d) => d.value)
		  .attr("x", (d, i) => i * 70)
		  .attr("y", (d, i) => h - (10 * d.value) - 3)

	}

	render() {
		return (
			<div id="chart"></div>
		)
	}

}

export default BarChart;