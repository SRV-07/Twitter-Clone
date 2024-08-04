import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./widget.css"
import {TwitterTimelineEmbed, TwitterTweetEmbed} from "react-twitter-embed"


const Widgets = () => {
  return (
    <div className="widgets">
       <div className="widgets_input">
       <SearchIcon className="widgets_searchIcon" />
       <input type="text" placeholder="searchTwitter"/>
       </div>

       <div className="widgets_widgetContainer">
        <h2> What's Happening Now</h2>
       </div>
       <TwitterTweetEmbed
  tweetId={'1557187138352861186'}
/>

<TwitterTimelineEmbed 
sourceType="profile"
screenName="ElonMusk"
options={{height: 500}}
/>
    </div>
  );
}

export default Widgets;