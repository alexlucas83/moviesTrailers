import React from 'react'
import VideoListItem from '../components/video-list-item/video-list-item'

export default function videoList(props) {
    // const movies = ["film1","film2","film3","film4","film5"]
    const movieList = props.movieList;
    return (
        <div>
            <ul>

                {
                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>

                    })
                
                /* <VideoListItem movie={movies[0]}/>
                <VideoListItem movie={movies[1]}/>
                <VideoListItem movie={movies[2]}/>
                <VideoListItem movie={movies[3]}/>
                <VideoListItem movie={movies[4]}/> */}

            </ul>
        </div>
    )
    function receiveCallBack(movie) {
        props.callback(movie)
    }

}
