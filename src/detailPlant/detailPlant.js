import React from "react";
import './detailPlant.css';
// import sweetPotato from 'img/temp_plant_img1.png';

const DetailPlant = () => {
    return(
        <div>
            <div class="loginBox">
                <img src='img/logo.png' alt='logo' />
                <div>
                <img className="imgStyle" src='img/temp_plant_img1.png' alt='sweetPotato' />
                </div>
                <label>고구마</label>
                <div>
                    <p className='textRoom'>
                        수확시기 : 10월
                        100g당 칼로리: 125Kcal
                        좋아하는 여자 스타일:
                        이쁘고 착하고 돈많고
                        나하나 책임지는 그런 여자
                        가 좋더라~      
                    </p>
                </div>
                <div>
                    <button class="loginButton">재배하기</button>
                </div>
            </div>
        </div>
    )
}

export default DetailPlant;