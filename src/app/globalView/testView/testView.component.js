import React from 'react';
import './testView.component.less';

export default class TestView extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      currentInput: '',
      todos: []
    };

    this.todoList = this.getTODOList();
    this.removeInvalidClass = this.removeInvalidClass.bind(this);
  }

  updateCurrentTODO (event) {
    this.removeInvalidClass();
    this.setState({currentInput: event.target.value});
  }

  addTODO (event) {
    if (this.state.currentInput) {
      let todos = this.state.todos.slice();
      todos.push(this.state.currentInput);
      this.setState({currentInput: '', todos: todos});
    } else {
      document.querySelector('.inputField').classList.add('invalid');
    }

  }

  getTODOList () {
    return this.state.todos.map((todo, index) => (
      <li key={index} className="todoItem">
        <span>{todo}</span>
        <span className="deleteTODO" onClick={this.removeTODOItem.bind(this, index)}>x</span>
      </li>
    ));
  }

  removeTODOItem (item) {
    let todos = this.state.todos.slice();
    todos.splice(item, 1);
    this.setState({todos: todos});
  }

  removeInvalidClass () {
    document.querySelector('.inputField').classList.remove('invalid');
  }

  render () {
    return (
      <div className="testView">
        <h1>Test app</h1>
        <div className="input">
          <form className="inputForm" onSubmit={this.addTODO.bind(this)}>
            <input
              type="text"
              className="inputField"
              value={this.state.currentInput}
              onChange={this.updateCurrentTODO.bind(this)} />
            <input
              type="submit"
              value="submit"
              style={{color: 'black', margin: '10px', padding: '7px'}}
              onBlur={this.removeInvalidClass} />
          </form>
        </div>

        <ul className="list">
          {this.getTODOList()}
        </ul>
      </div>
    )
  }
}
