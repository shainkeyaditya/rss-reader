import React from 'react';

const NewsCard = ({title, description, pubDate, link }) => {
    return ( 
        <div style={{'maxHeight': '430px'}} className="card">
        <div className="card-header">
         {pubDate}
        </div>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text" dangerouslySetInnerHTML={{__html: description}}/>
          <a href={link} target="_blank" > Read Full Story</a>
        </div>
      </div>
        );
}
 
export default NewsCard;