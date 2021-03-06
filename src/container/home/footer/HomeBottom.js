import React from 'react'
import { Layout } from 'antd'
import './homeBottom.less'

const { Footer } = Layout

export default class HomeBottom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timer: 0
		}
	}

	tick = () => {
		this.setState({ timer:this.state.timer + 1 })
	}

	// 组件渲染后开始循环执行tick函数
	componentDidMount() {
		this.interval = setInterval(this.tick, 1000)
	}

	// 组件将要死亡时清除计时器，不清除也可以
	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<Footer className="bottom">
				<span className="me">Copyright © 2018 xxxxx有限公司 版权所有 | 沪ICP备xxxxxxx号</span>
			</Footer>
		)
	}
}