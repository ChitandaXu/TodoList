import React, { Component } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

class TodoList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			list: []
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	render() {
		return (
			<div>
				<div>
					<input
						value={this.state.inputValue}
						onChange={this.handleInputChange}
					/>
					<button onClick={this.handleButtonClick}>Submit</button>
				</div>
				<ul>
					{this.getTodoItem()}
				</ul>
			</div>
		);
	}

	componentDidMount() {
		axios.get('/api/todolist')
			.then((res) => {
				console.log(res.data);
				this.setState(() => ({
					list: [...res.data]
				}));
			})
			.catch(() => {alert('error')})
	}

	getTodoItem() {
		return this.state.list.map((item, index) => {
			return (
				<TodoItem 
					key={index}
					content={item} 
					index={index}
					deleteItem={this.handleItemDelete}
				/>
			)
		});
	}

	handleInputChange(e) {
		const value = e.target.value;
		this.setState(() => ({
				inputValue: value
		}));
	}

	handleButtonClick() {
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.inputValue],
			inputValue: ''
		}));
	}

	handleItemDelete(index) {
		this.setState((prevState) => {
			const list = [...prevState.list];
			list.splice(index, 1);
			return {list}
		});
	}
}

export default TodoList;