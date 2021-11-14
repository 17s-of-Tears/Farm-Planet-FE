import React from "react";
import "./profile.css"

const Profile = () => {
    var me = {
        name:"압구정의 자랑 이진수",
        date: "2017-01-05",
        yard:"350m",
        plantPhoto:"http://localhost:3000/myplant",
        myAddress:"압구정 4번출구 날 기다리는 그녀 이름 경은이",
        profileImg:"./logo192.png",
        farmName:"진수는 돈이 많수",
        myPlant:['이진수는','왜그리','돈이 많수'],
        myWoud:['사과나무','오목나무','압구정나무','50억나무'],
    }


    return(
        <div>
            <div className="heightGroup">
                <div className="setProfileImg"><p>{me.name}</p></div> 
                <div className="setProfile">
                    <p>{me.date}</p>
                    <p>{me.yard}</p>
                    <p><a href={me.plantPhoto}>사진보기</a></p>
                    <p>{me.myAddress}</p>
                    <p>구독 해지</p>
                </div>
            </div>
            <div className="underGroup">
                <div className="plant"></div>
                <div className="farm">{me.farmName}</div>
            </div>
        </div>
    )
}


export default Profile;