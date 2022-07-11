import React, { useRef, useState, useEffect } from 'react'; 
import navIcon from '../images/nav-icon.png'; 
import '../scss/components/nav.scss'; 
import fotpro from '../images/fot-pro.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass, faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons'; 
import gsap from 'gsap'; 
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { getTeams, changeSearchValue, changeInputErrorTrue, changeInputErrorFalse } from '../redux/teams'; 
import { useNavigate } from 'react-router-dom';

function Nav() { 

    const { teamdata } = useSelector((state) => state.team); 
    const dispatch = useDispatch(); 

    //functional navigation 
    const navigate = useNavigate();

    //useRef 
    const navAnim = useRef(null); 
    const logoAnim = useRef(null); 
    const searchAnim = useRef(null); 
    const arrowAnim = useRef(null); 
    const inputXAnim = useRef(null); 

    //useState 
    const [inputValue, setInputValue] = useState(""); 
    const [sideNavShow, setSideNavShow] = useState(false); 
    const [scrollableBool, setScrollableBool] = useState(true); 

    //useEffect 
    useEffect(() => {
        if (teamdata.length === 0) {
            dispatch(getTeams()); 
        }
    }, [teamdata, dispatch]); 

    //functions 
    const handleOpenSearch = () => { 
        gsap.fromTo(navAnim.current, {}, {left: '-150%', opacity: 0, display: 'none', duration: 0.75}); 
        gsap.fromTo(logoAnim.current, {}, {left: '-150%', opacity: 0, display: 'none', duration: 0.75}); 
        gsap.fromTo(searchAnim.current, {display: 'block', opacity: 0}, {width: size.width < 700 ? '100px' : size.width < 1200 ? '200px' : size.width < 1800 ? '300px' : size.width < 2000 ? '400px' : '600px', opacity: 1, duration: 0.75}); 
        gsap.to(arrowAnim.current, {pointerEvents: 'all', opacity: 1, delay: 0.5}); 
        gsap.to(inputXAnim.current, {opacity: 1, delay: 0.5}); 
    }; 

    const handleCloseSearch = () => {
        gsap.fromTo(navAnim.current, {}, {left: '0%', opacity: 1, display: 'block', duration: 0.75}); 
        gsap.fromTo(logoAnim.current, {}, {left: '0', opacity: 1, display: 'block', duration: 0.75}); 
        gsap.fromTo(searchAnim.current, {width: '100px', opacity: 1}, {width: '0px', opacity: 0, display: 'none', duration: 0.75}); 
        gsap.to(arrowAnim.current, {opacity: 0, pointerEvents: 'none'}); 
        gsap.to(inputXAnim.current, {opacity: 0, delay: 0}); 
    }; 

    const emtpyInput = () => {
        setInputValue(""); 
    }; 

    const handleFormSubmit = e => {
        e.preventDefault(); 

        let teamArr = []; 
        
        for (let i = 0; i < teamdata.length; i++) {
            if (teamArr.length < 15) {
                let team = teamdata[i].Name.toLowerCase(); 
                if (team.includes(inputValue.trim().toLowerCase())) {
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

        navigate('/FotPro/TeamSearch'); 
    }

    const handleInputChange = e => {
        e.preventDefault(); 
        setInputValue(e.target.value); 
    }; 

    const showNav = () => {
        setSideNavShow(true); 
        setScrollableBool(false); 
    }; 

    const hideNav = () => {
        setSideNavShow(false); 
        setScrollableBool(true); 
    }

    if (scrollableBool) {
        document.body.style.overflowY = 'scroll'; 
    }

    if (!scrollableBool) {
        document.body.style.overflowY = 'hidden'; 
    }

    //window size 
    const size = useWindowSize();

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });
        
        useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);
            
            // Call handler right away so state gets updated with initial window size
            handleResize();
            
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        
        return windowSize;
    }; 

    return (
        <nav>
            {
                !sideNavShow ? 

                null 

                : 

                <div>
                    <div className="side-nav-background-overlay" onClick={hideNav}></div>
                    
                    <div className="side-nav-container">
                        <div className="svg-container">
                            <FontAwesomeIcon icon={faXmark} color="white" style={{width: '15px', height: 'auto'}} onClick={hideNav} /> 
                        </div>

                        <div className="link-container">
                            <Link to="/FotPro/">Home</Link>
                            <Link to="/FotPro/TeamSearch">Teams</Link>
                            <Link to="/FotPro/LeagueShowCase">Leagues</Link>
                            <Link to="/FotPro/GamesToday">Games Today</Link>
                        </div>
                    </div>
                </div>
            } 

            <div className="nav-content">

                <div ref={navAnim} id="nav-icon">
                    <img alt="" src={navIcon} style={{width: '40px', height: 'auto'}} onClick={showNav} /> 
                </div>
                <Link to="/FotPro/" ref={logoAnim} id="logo-icon">
                    <img alt="" src={fotpro} style={{width: '55px', height: 'auto'}} /> 
                </Link> 

                <form className="text-field-position" onSubmit={handleFormSubmit} onChange={handleInputChange}>
                    <input ref={searchAnim} placeholder="Search Teams" onChange={handleInputChange} value={inputValue} /> 
                    <div ref={inputXAnim} onClick={emtpyInput} id="floating-x">&times;</div>
                </form>

                <FontAwesomeIcon onClick={handleOpenSearch} icon={faMagnifyingGlass} id="search-icon" style={{width: '25px', height: 'auto'}} /> 
                <div id="right-arrow" ref={arrowAnim}>
                    <FontAwesomeIcon onClick={handleCloseSearch} icon={faAngleRight} color={'white'} /> 
                </div>

                <div className="big-width-nav-view-container">
                    <Link to="/FotPro/">Home</Link>
                    <Link to="/FotPro/TeamSearch">Teams</Link>
                    <Link to="/FotPro/LeagueShowCase">Leagues</Link>
                    <Link to="/FotPro/GamesToday">Games Today</Link>
                </div>

            </div>
        </nav>
    )
}

export default Nav; 
