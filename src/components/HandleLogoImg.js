import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons'; 

function HandleLogoImg(props) { 

    //useState 
    const [error, setError] = useState(false); 

    return (
        <div>
            <img alt="" onError={() => setError(true)} style={{display: 'none'}}
                src={
                    !error ? 

                        props.img 

                    : 

                        null  
                } />

            {
                error || props.img === null ? 

                <FontAwesomeIcon icon={faFutbol} color="white" />  

                : 

                <img alt="" src={props.img} /> 
            } 
        </div> 
    )
}

export default HandleLogoImg; 
