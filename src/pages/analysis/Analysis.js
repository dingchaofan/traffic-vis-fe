import React, { Component } from 'react';
import { Row, Col, Button, PageHeader } from 'antd';
import MapBoxVis from '../../common/MapBoxVis';
import './Analysis.css'
class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 模拟数据
            data: {
                data: [
                    [116.368608, 39.901744, 150],
                    [116.378608, 39.901744, 350],
                    [116.388608, 39.901744, 500],
                ],
                datatime: ''
            },
            chartsParam: {
                titleText: "交通拥堵情况三维柱状图",
            }
        }

    };

    // 加载数据
    loaddata = (jsonPath) => {
        // 读取本地的json，需要将json文件放到与public/index.html同级目录
        fetch(jsonPath)
            .then(res => res.json())
            .then(json => {
                let dataP = json.data
                for (let i = 0, len = dataP.length; i < len; i++) {
                    // 数据映射 1->1 3->150 7-175 10->200
                    switch (dataP[i][2]) {
                        case 3:
                            dataP[i][2] = 150;
                            break;
                        case 7:
                            dataP[i][2] = 175;
                            break;
                        case 10:
                            dataP[i][2] = 200;
                            break;
                        default:
                            break;
                    }
                }
                // 初始化数据结构
                let data = {
                    data: [],
                    datatime: ''
                }
                data.data = dataP
                data.datatime = jsonPath.split('/')[jsonPath.split('/').length - 1].split('.')[0]
                this.setState({
                    data: data
                })
            })
    };

    componentDidMount() {
    };

    componentWillUnmount() {
        console.log('Analysis Destory')
    }

    render() {
        return (
            <div>
                <Row gutter={[16, 0]}>
                    <Col span={24}>
                        <PageHeader
                            ghost={false}
                            onBack={() => window.history.back()}
                            title="交通拥堵可视化分析"
                            // subTitle="交通拥堵"
                            extra={[
                                <Button
                                    key="1"
                                    type="primary"
                                    onClick={() => {
                                        this.loaddata("./2019-04-02_09-00.json")
                                    }}>测试数据</Button>,
                                <Button key="2" type="primary" >数据轮播</Button>,
                                <Button key="3" type="primary" >单数据动态演示</Button>,
                                <Button
                                    key="4"
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            flyActionParam: [116.360163, 40.001514, 14, 60, -45, 2000]
                                        })
                                        console.log(this.state.flyActionParam)
                                    }}
                                >局部演示</Button>,
                                <Button
                                    key="5"
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            flyActionParam: [116.420608, 39.851744, 11.5, 60, -30, 1000]
                                        })
                                    }}
                                >全局演示</Button>,
                                <Button
                                    key="6"
                                    onClick={() => {
                                        this.setState({
                                            data: {
                                                data: [],
                                                datatime: ''
                                            },
                                            flyActionParam: [116.368608, 39.901744, 10, 60, -30, 1000]
                                        })
                                    }}>地图重置</Button>,
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 4]}>
                    <Col span={24} className="mapContainer">
                        <MapBoxVis chartsParam={this.state.chartsParam} data={this.state.data} flyActionParam={this.state.flyActionParam} />
                    </Col>
                </Row>
            </div>
        );
    };
};

export default Analysis;