import Main from "./pages/Main"; 
import { Routes, Route } from "react-router-dom"; 
import TeamSearch from "./pages/TeamSearch"; 
import Team from "./pages/Team";
import Game from "./pages/Game";
import GamesToday from "./pages/GamesToday";
import Player from "./pages/Player";
import LeagueShowCase from "./pages/LeagueShowCase";
import League from "./pages/League";
import ErrorPage from "./pages/ErrorPage";

function App() {
	return (
		<div> 
		<Routes>

			<Route path="/FotPro/" element={<Main />} /> 

			<Route path="/FotPro/TeamSearch" element={<TeamSearch />} /> 

			<Route path="/FotPro/Team/:index" element={<Team />} /> 

			<Route path="/FotPro/Game/:gameid" element={<Game /> } /> 

			<Route path="/FotPro/GamesToday" element={<GamesToday /> } /> 

			<Route path="/FotPro/Player/:playerid" element={<Player /> } /> 

			<Route path="/FotPro/LeagueShowCase" element={<LeagueShowCase /> } /> 

			<Route path="/FotPro/League/:areaid" element={<League /> } /> 

			<Route path="*" element={<ErrorPage /> } status={404} /> 
		
		</Routes>
		</div>
	);
}

export default App; 
