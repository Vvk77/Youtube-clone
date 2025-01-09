import React, { useEffect, useState } from 'react';
import "./Playvideo.css";
import moment from 'moment';

import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";

import { API_KEY, value_converter } from '../../data';
import { useParams } from 'react-router-dom';

const Playvideo = () => {

    const {videoId} = useParams()

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // Fetch video data
    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoDetails_url);
        const data = await response.json();
        setApiData(data.items[0]);
    };

    // Fetch channel and comment data
    const fetchChannelData = async () => {
        if (apiData) {
            const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const response = await fetch(channelData_url);
            const data = await response.json();
            setChannelData(data.items[0]);

            const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
            const commentResponse = await fetch(comment_url);
            const commentData = await commentResponse.json();
            setCommentData(commentData.items);
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData) {
            fetchChannelData();
        }
    }, [apiData]);

    return (
        <div className="play-video">
            {/* Embedded YouTube Video */}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>

            {/* Video Title */}
            <h3>{apiData ? apiData.snippet.title : "titlehere"}</h3>

            {/* Video Info */}
            <div className="play-video-info">
                <p>
                    {apiData ? value_converter(apiData.statistics.viewCount) : "16k"} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "Loading..."}
                </p>
                <div>
                    <span>
                        <img src={like} alt="Like" />{apiData ? value_converter(apiData.statistics.likeCount) : 155}
                    </span>
                    <span>
                        <img src={dislike} alt="Dislike" />
                    </span>
                    <span>
                        <img src={share} alt="Share" /> Share
                    </span>
                    <span>
                        <img src={save} alt="Save" /> Save
                    </span>
                </div>
            </div>

            <hr />

            {/* Publisher Info */}
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="Publisher" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>

            {/* Video Description */}
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "description here"}</p>
                <p>Subscribe to GreatStack to watch more tutorials on web development.</p>
            </div>

            <hr />

            {/* Comments Section */}
            <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102}</h4>

            {commentData.map((item, index) => (
                <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Profile" />
                    <div>
                        <h3>
                            {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                        </h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="Like" />
                            <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={dislike} alt="Dislike" />
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Playvideo;
