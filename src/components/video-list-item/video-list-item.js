import React from 'react';
import './video-list-item.css'


const IMAGE_BASE_URL ="https://image.tmdb.org/t/p/w500/"
export default function videoListItem(props) {
    const movie = props.movie
    return (
        <li className="list-group-item" onClick={handleClick} >
            <div className="media" >
                <div  className="media-left">
                    <img className="media-object img-rounded" height="100px" width="80px"src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt=""/>

                </div>
            <div className="media-body" >
            <h5 className="title_list_item" >{movie.title}</h5> 
            </div>

            </div>
        </li>
    )

    function handleClick(){
        props.callback(movie)
console.log("click",movie)
    }

}
