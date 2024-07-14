import PropTypes from 'prop-types';
import React, { Component } from 'react'
import Newsitems from './newsitems'
import Spineer from '../Spineer';
import InfiniteScroll from 'react-infinite-scroll-component';
import App from '../App.js';
export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 12,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pages: 1,
      loading: false,
      totalResults: 0
    }
  }
  category = window.location.pathname.split("/")[1] || 'general';
  searchParams = new URLSearchParams(window.location.search)
  // api call
  async getNews(defaultCate) {
    this.props.setProgress(10)
    this.setState({ pages: 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${defaultCate}&apiKey=7b5261413a9f436b83d3d710c20a04ba&page=${this.state.pages}&pagesize=${this.props.pagesize}`
    this.setState({
      category: defaultCate,
      loading: true
    });
    let data = await fetch(url).then(res => res.json());
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
      pages: 2
    });
    this.props.setProgress(100)
    document.title = `${this.props.category}-NewsBar`
  }
  componentDidMount() {
    const category = this.searchParams.get('category') || 'general'
    this.getNews(category)
  }

  componentDidUpdate(prevProps, prevState) {
    const category = window.location.pathname.split("/")[1] || 'general'
    if (category !== prevState.category) { this.getNews(category) }
  }
  fetchMoreData = async (defaultCate) => {
    this.setState({ pages: this.state.pages + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${defaultCate}&apiKey=7b5261413a9f436b83d3d710c20a04ba&page=${this.state.pages}&pagesize=${this.props.pagesize}`
    //let url = `https://saurav.tech/NewsAPI/top-headlines/category/${defaultCate}/in.json&page=${this.state.pages}`
    this.setState({
      category: defaultCate,
      loading: true
    });
    let data = await fetch(url).then(res => res.json());
    console.log("abc", this.state.articles);
    console.log("def", data.articles);
    this.setState({
      articles: [...this.state.articles, ...data.articles],
      totalResults: data.totalResults,
      loading: false
    });
  };
  render() {
    return (
      <>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={() => this.fetchMoreData(this.state.category)}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spineer />}


        >
          <div className='container overflow-hidden'>
            <div className='row'>
              {this.state.articles.map((e, idx) =>
                <div className='col-md-4' key={idx}>
                  <Newsitems title={e.title} description={e.description} url={e.urlToImage} newsurl={e.url} />
                </div>
              )}
            </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.pages <= 1} className='btn btn-primary' onClick={this.handleprevclick} >Previous</button>
          <button disabled={this.state.pages + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} className='btn btn-primary' onClick={this.handlenextclick}>Next</button>
        </div>
      </>
    )
  }
}