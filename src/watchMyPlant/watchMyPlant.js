import React from "react";
import { Card } from "antd";

const WatchMmyPlant = () => {
    return(
        <div>
            <p>고구마</p>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" 
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                {/* <Meta title="date" /> */}
            </Card>,
        </div>
    )
}


export default WatchMmyPlant;