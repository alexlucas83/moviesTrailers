import React, {Component}from 'react';
import './App.css';
import SearchBar from './components/searchBar/search-bar'
import VideoList from './container/video-list'
import Axios from 'axios'
import VideoDetail from './components/video-detail' 
import Video from './components/video/video'

const API_END_POINT = 'https://api.themoviedb.org/3/'
const POPULAR_MOVIES_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images'
const MOVIE_VIDEO_URL ="&append_to_response=videos&include_adult=false"
const API_KEY = 'api_key=d4c0074da85e38a882a3e60c46830006'
const SEARCH_URL = 'search/movie?language=fr&include_adult=false'

class App extends Component {
  constructor(props) {
    super(props) 
      this.state = {
        movieList:{},
        currentMovie:{}
      }
    
  }

  componentDidMount() {
		Axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
			.then(response => {
        this.setState({ movieList: response.data.results.slice(1,10), currentMovie: response.data.results[0]}, function(){
          this.VideoMovie();
        });
			})
			.catch(error => console.log(error))
  }
  
  VideoMovie(){
        Axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}${MOVIE_VIDEO_URL}`)
          .then(response => {
      const youtubeKey = response.data.videos.results[0].key;
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({currentMovie : newCurrentMovieState})
    })
    .catch(error => console.log(error))

  }

  onClickListItem(movie){
    this.setState({currentMovie:movie},function(){
      this.VideoMovie();
      this.setRecommendation();

    })
  }

  onCliskSearch(searchText){
    if(searchText){
    Axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
    .then(response => {
      if(response.data && response.data.results[0]){
        if(response.data.results[0].id !== this.state.currentMovie.id){
          this.setState({ currentMovie: response.data.results[0]},() => {
            this.VideoMovie();
            this.setRecommendation();
          });
  
        }
      }
    })
    .catch(error => console.log(error))

  }}

  setRecommendation(){
    Axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
    .then(response => {
      this.setState({ movieList: response.data.results.slice(0,9)});
    })
    .catch(error => console.log(error))

  }

  render(){
    const renderVideoList = () => {
      if(this.state.movieList.length>=5){
        return       <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>

      }
    }
  return (
    <div className="App">
      <div className="search_bar" >
      <SearchBar callBack={this.onCliskSearch.bind(this)} />

      </div>
      <div className="row" >
        <div className="offset-1" ></div>
        <div className="col-md-7" >
      <Video videoId={this.state.currentMovie.videoId}/>
      <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />

      </div>
      <div className="col-md-4" >
      {renderVideoList()}
      </div>
      </div>
    </div>
  );
}
}

export default App;