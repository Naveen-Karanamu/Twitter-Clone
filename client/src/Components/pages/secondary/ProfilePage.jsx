import React from "react";
import TweetComponent from "../../Tweet.Component";

const ProfilePage=()=>{
    return (
        <>
        <div>
            <p>Hello Naveen</p>
            <div>
                <p>Posts</p>
            </div>
            {/* My tweets */}
            <TweetComponent />

        </div>
        </>
    )
}

export default ProfilePage;