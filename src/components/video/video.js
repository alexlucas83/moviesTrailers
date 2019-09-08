import React from 'react'
import "./video.css"

const BASE_URL_YOUTUBE ="https://www.youtube.com/embed/";

export default function video({videoId}) {
    return (
        <div className="embed-responsive embed-responsive-16by9"  >
            <iframe className="embed-responsive-item" src={`${BASE_URL_YOUTUBE}${videoId}`} alt=""/>
        </div>
    )
}
