import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 5,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
        document.title=`${this.capitalize(this.props.category)} - NewsMonkey`
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?apiKey=cc4bf8fc860f4926b317ef5df8c55bbe&country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading: false
        })
        console.log(this.state.page)
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        await this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }
    handleNextClick = async() => {
        // console.log("Next");
        await this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }
    async componentDidMount() {
        this.updateNews();
    }
    render() {
        return (
            <div>
                <div className="container my-3">
                    <h1 className="text-center">NewsMonkey - Top  {this.capitalize(this.props.category)} Headlines </h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                        <div className="container d-flex justify-content-between">
                            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
                                Previous</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
