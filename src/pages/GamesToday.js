import React, { useEffect } from 'react'; 
import { getGamesDate } from '../redux/gamesdate'; 
import { useSelector, useDispatch } from 'react-redux'; 
import '../scss/pages/gamestoday.scss'; 
import Nav from '../components/Nav'; 
import GetTeamLogo from '../components/GetTeamLogo'; 
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

function GamesToday() {

    const { gamesdateloading, gamesdatedata, gamesdateissuccess } = useSelector((state) => state.gamesdate); 
    const dispatch = useDispatch(); 

    //useEffect
    useEffect(() => {
        if (gamesdatedata.length === 0) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            }
            
            function formatDate(date) {
                return [
                    date.getFullYear(),
                    padTo2Digits(date.getMonth() + 1),
                    padTo2Digits(date.getDate()),
                ].join('-');
            } 

            dispatch(getGamesDate(formatDate(yesterday)));
        }
    }, [dispatch, gamesdatedata]); 

    return (
        <div> 

            {
                gamesdateissuccess === null || gamesdateloading ? 

                    <Loading /> 

                : 

                !gamesdateissuccess ? 

                    <div>error occured</div>

                : 

                    <div className="games-today-page">

                        <Nav /> 

                        <div className="games-today-container">

                            <h2>Games Today</h2>

                            {
                                gamesdatedata.map((x, y) => 
                                    <Link key={y} className="match-container" to={"/FotPro/Game/" + x.GameId}>
                                        <div className="match-content">
                                            <div id="left-team-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <p>{x.HomeTeamName}</p>
                                            </div>
                                            <h3>vs</h3>
                                            <div id="right-team-container">
                                                <p>{x.AwayTeamName}</p>
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default GamesToday; 
