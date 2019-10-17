/**
 * Created by Shainkey on 17-10-2019.
 */

import React, { Component } from 'react';

class SearchBox extends Component {
   constructor(props){
        super(props);
        this.state = { 
            searchContent:''
         }
   }
    handleChange = (event) => {
            this.setState({searchContent:event.target.value})
    }

    searchContent=()=>{
        this.props.updateNewsFeed(this.state.searchContent)
    }


    render() { 
        return ( 
            <React.Fragment>
                <input name="searchContent" id="searchContent" type="text" value={this.state.searchContent} placeholder="serch for an item...." onChange={this.handleChange}/>
                <button onClick={this.searchContent.bind(this)}>Search</button><hr/>
             </React.Fragment>
         );
    }
}
 
export default SearchBox;
