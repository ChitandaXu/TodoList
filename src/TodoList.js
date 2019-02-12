import React, { Component } from 'react';
import store from './store';
import { connect } from 'react-redux';
import { CHANGE_INPUT_VALUE, ADD_ITEM } from './store/actionTypes';

class TodoList extends Component {
	
	constructor(props) {
		super(props);
		this.state = store.getState();
	}

	render() {
		const { inputValue, list, changeInputValue, handleClick } = this.props;
		return (
			<div>
				<div>
					<input value={inputValue} onChange={changeInputValue}/>
					<button onClick={handleClick}>Submit</button>
				</div>
				<ul>
					{
						list.map((item, index) => {
							return <li onClick={this.props.handleDelete} key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		inputValue: state.inputValue,
		list: state.list
	}
}

// store.dispatch, props
const mapDispatchToProps = (dispatch) => {
	return {
		changeInputValue(e) {
			const action = {
				type: CHANGE_INPUT_VALUE,
				value: e.target.value
			};
			dispatch(action);
		},

		handleClick() {
			const action = {
				type: ADD_ITEM
			}
			dispatch(action);
		},

		handleDelete() {

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);