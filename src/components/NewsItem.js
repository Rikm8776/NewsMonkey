import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                    <span
                        className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
                        style={{ zIndex: 1, left: '90%' }}
                    >
                        {source}
                    </span>
                    <img src={!imageUrl ? "https://imageio.forbes.com/specials-images/imageserve/6572f1e5c6898fd9524d5474/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" : imageUrl} className="card-img-top" alt="loading..." />
                    <div className="card-body">

                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toLocaleString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}
