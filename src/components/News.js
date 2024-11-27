import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'us', pageSize = 6, category = "general", apiKey, setProgress }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalresults, setTotalResults] = useState(0)
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const updateNews = async () => {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;;
        let data = await fetch(url);
        setProgress(30);
        let parsedData = await data.json()
        setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setProgress(100);


    }
    const fetchMoreData = async () => {
        const pageNo = page + 1;
        console.log(pageNo);
        const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${country}&category=${category}&page=${pageNo}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setPage(pageNo)
        setArticles(articles.concat(parsedData.articles))

    };
    useEffect(() => {
        updateNews();
        document.title = `${capitalize(category)} - NewsMonkey`

    }, [])
    return (
        <>
            <h1 className="text-center" style={{ marginTop: "72px" }}>NewsMonkey - Top  {capitalize(category)} Headlines </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalresults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


// News.defaultProps = {
//     country: 'us',
//     pageSize: 6,
//     category: "general"
// }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;