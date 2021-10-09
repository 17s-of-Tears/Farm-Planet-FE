import react from "react";
import "./profile.css"

const Profile = () => {
    return(
        <div>
            <div className="heightGroup">
                <div className="setProfileImg"><p>이름</p></div> 
                <div className="setProfile">
                    <p>구독 날짜</p>
                    <p>밭 평수</p>
                    <p>식물 사진보기</p>
                    <p>구독자 주소</p>
                    <p>구독 해지</p>
                </div>
            </div>
            <div className="underGroup">
                <div className="plant"></div>
                <div className="farm">진수는 돈이 많수</div>
            </div>
        </div>
    )
}


export default Profile;