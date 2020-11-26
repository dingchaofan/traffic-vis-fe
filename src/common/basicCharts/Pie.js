import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-gl';

class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.chartsPie = null // echarts对象实例
        
        this.showPie = this.showPie.bind(this)

        
    }

    
    showPie() {
        // echarts对象实例
        this.chartsPie = echarts.init(document.getElementById(this.props.chartsPieID));

        let initOption = {
            title: {
                text: '拥堵占比',
                left: 'top'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        this.chartsPie.setOption(initOption)
    }

    componentDidMount() {
        this.showPie();
        window.onresize = () => {
            this.chartsPie.resize()
        }
    }

    componentWillUnmount() {
        console.log('chartsPie Destory')
        this.chartsPie = null // echarts对象实例
    }

    render() {
        return (
            <div id={this.props.chartsPieID} style={{ minHeight: "100px", height: "100%", width: "100%" }} />
        );
    }
}

export default Pie;