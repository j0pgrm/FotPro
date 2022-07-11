import React, { useEffect, useState } from 'react'; 
import player, { getPlayer } from '../redux/player'; 
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios'; 

function HandlePlayerImg(props) {

    // const { playerdata, playerloading } = useSelector((state) => state.player); 
    // const dispatch = useDispatch(); 

    const [playerData, setPlayerData] = useState([]); 
    const [playerLoading, setPlayerLoading] = useState(true); 

    //useEffect 
    // useEffect(() => {
    //     dispatch(getPlayer(props.id)); 
    // }, [dispatch, props]); 
    useEffect(() => {
        axios.get('https://api.sportsdata.io/v3/soccer/scores/json/Player/' + props.id + '?key=85f966019b5143f4af15b4d9bd3a78e5')
        .then((res) => {
            setPlayerData(res.data); 
            setPlayerLoading(false); 
        })
    }, [props]); 

    return (
        <div>
            {
                playerLoading ? 

                    null 

                : 

                    <img alt="" src={playerData.PhotoUrl} /> 
            }
        </div>
    )
}

export default HandlePlayerImg; 
