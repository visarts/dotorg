import { Component } from 'react';
import dataService from 'Services/data.service';
import Item from './literatureItem.component';

export default class ItemContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: false
    };
    this.setContent.call(this);
  }

  setContent () {
    const itemId = this.props.globalState.routing.item;
    const authorId = itemId.split('-')[0];
    dataService.getHTMLContent(authorId, itemId)
      .then(results => {
        this.setState({content: {__html: results}});
      });
  }

  render () {
    return (
      <div>
        {this.state.content && <Item {...this.props} content={this.state.content} />}
      </div>
    );
  }
}
