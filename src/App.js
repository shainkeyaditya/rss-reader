import React, {Component} from 'react';
import './App.css';
import fetch from 'node-fetch';
import axios from 'axios';
import NewsCard from './newsCard';
import SearchBox from './SearchBox';
import Header from './Header';

function chunkify(a, n, balanced) {
    
  if (n < 2)
      return [a];

  var len = a.length,
          out = [],
          i = 0,
          size;

  if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
          out.push(a.slice(i, i += size));
      }
  }

  else if (balanced) {
      while (i < len) {
          size = Math.ceil((len - i) / n--);
          out.push(a.slice(i, i += size));
      }
  }

  else {

      n--;
      size = Math.floor(len / n);
      if (len % size === 0)
          size--;
      while (i < size * n) {
          out.push(a.slice(i, i += size));
      }
      out.push(a.slice(size * n));

  }

  return out;
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      newsList:[]
    }
  }

  updateNewsFeed = async(searchUrl) =>{
    axios({
      method: 'post',
      url: 'http://localhost:8000/getNewsFeed',
      data: {
        address: searchUrl
      }
    }).then(({data})=>{
      this.setState({newsList:[...data]})
    }).catch(err => {
      this.setState({newsList:[]})
    });
  }

  componentDidMount() {
    fetch('http://localhost:8000/newsFeed').then(data => data.json())
    .then(result => this.setState({newsList:[...result]}))
    .catch(err=>  console.log(err))
  }

  render() { 

    let {newsList} = this.state

    if(!newsList.length)
    {
      return (<h2>Not Found NewsFeed</h2>)
    }

    let noOfRows = Math.ceil((newsList.length)/3)
    let arr = [...newsList]
    let groupNewsList = chunkify(arr, noOfRows, false)
    
    return (
      <div className="container">
        <Header/><br></br>
        <SearchBox updateNewsFeed = {this.updateNewsFeed}/>
        { groupNewsList.map((groupItem, groupIndex) => {
              return( 
                      <div className="row" key={groupIndex}>
                {
                    groupItem.map((item , itemIndex)=>{
                      return(<div className="col-sm" key={itemIndex}>
                        <NewsCard {...item} />
                      </div>)
              
                    })
                }
                      </div>  )
        })}
      </div>
    );
  }
}
 

export default App;
