import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'; 
import '../scss/pages/teamsearch.scss'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { getTeams, changeSearchValue, changeInputErrorTrue, changeInputErrorFalse } from '../redux/teams'; 
import HandleLogoImg from '../components/HandleLogoImg'; 
import { Link } from 'react-router-dom'; 
import Loading from '../components/Loading';

function TeamSearch() { 

    const { teamdata, teamindexresult, inputerrorbool, loading, issuccess } = useSelector((state) => state.team); 
    const dispatch = useDispatch(); 
    
    //useState 
    const [searchValue, setSearchValue] = useState(""); 
    
    const [searchLoadBool, setSearchLoadBool] = useState(false); 
    
    //useEffect 
    useEffect(() => {
        if (teamdata.length === 0) {
            dispatch(getTeams()); 
        } 
    }, [teamdata, dispatch]); 

    //functions 
    const handleFormSubmit = e => {
        setSearchLoadBool(true); 
        e.preventDefault(); 

        let teamArr = []; 

        for (let i = 0; i < teamdata.length; i++) {
            if (teamArr.length < 15) {
                let team = teamdata[i].Name.toLowerCase(); 
                if (team.includes(searchValue.trim().toLowerCase())) {
                    teamArr.push(teamdata.indexOf(teamdata[i])); 
                }
            } 
        } 

        dispatch(changeSearchValue(teamArr)); 

        if (teamArr.length === 0) {
            dispatch(changeInputErrorTrue()); 
        } 

        else if (teamArr.length > 0) {
            dispatch(changeInputErrorFalse()); 
        } 

        setTimeout(() => {
            setSearchLoadBool(false); 
        }, 1500)
    }; 

    const handleFormChange = e => {
        e.preventDefault(); 
        setSearchValue(e.target.value); 
    }

    return (
        <div>
        {
            issuccess === null && loading ? 

                <Loading /> 

            : 

            !issuccess ? 

                <div>error occured</div>

            : 

                <div className="teams-page">

                    <div className="back-img"></div>
            
                    <Nav /> 

                    <form className="teams-container" onSubmit={handleFormSubmit} onChange={handleFormChange}>
                        <h1>Search Team</h1>
                        <input placeholder='search' type="text" value={searchValue} onChange={handleFormChange} /> 
                        <button type="submit">Search</button>
                    </form>
                    
                    {
                        inputerrorbool ? 

                            <h2>No Results</h2> 

                        : 

                        teamindexresult.length === 0 ? 

                           <div className="search-team-result-container">
                                <h2>Popular</h2>
                                <div className="search-team-result-content">
                                    {
                                        [97, 3, 92, 27, 51, 9, 24].map((x, y) => 
                                            <Link id="team-item" key={y} to={"/FotPro/Team/" + teamdata[x].TeamId}>
                                                <img alt="" src={teamdata[x].WikipediaLogoUrl} /> 
                                                <h3>{teamdata[x].Name}</h3>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div> 

                        : 

                        searchLoadBool ? 

                            <div id="loading-circle"></div>

                        : 

                            <div className="search-team-result-container">
                                <h2>Results</h2>
                                <div className="search-team-result-content">
                                    {
                                        teamindexresult.map((x, y) => 
                                            <Link id="team-item" key={y} to={"/FotPro/Team/" + teamdata[x].TeamId}>
                                                <HandleLogoImg img={teamdata[x].WikipediaLogoUrl} /> 
                                                <h3>{teamdata[x].Name}</h3>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                    }
                    

                </div>
        }
        </div>
    )
}

export default TeamSearch; 
