import React, { useState, useEffect } from 'react'; 
import HandleLogoImg from './HandleLogoImg'; 
import { useSelector } from 'react-redux'; 

function GetTeamLogo(props) {

    const { teamdata } = useSelector((state) => state.team);  

    //useState 
    const [imgState, setImgState] = useState(""); 

    //useEffect 
    useEffect(() => {
        for (let i = 0; i < teamdata.length; i++) {
            if (teamdata[i].TeamId === props.id) {
                setImgState(teamdata[i].WikipediaLogoUrl); 
            }
        }
    }, [props, teamdata]); 

    return (
        <HandleLogoImg img={imgState} /> 
    )
}

export default GetTeamLogo; 
