import React from 'react'
const Newsitems = (props) => {
  return (
    <>
      <div className="card" style={{ width: "18rem", margin: "3rem" }}>
        <img src={!props.url ? "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg" : props.url} className='card-img-top'></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <a href={props.newsurl} target="_blank" className="btn btn-primary">Read  More</a>
        </div>
      </div>
    </>
  )
}
export default Newsitems;