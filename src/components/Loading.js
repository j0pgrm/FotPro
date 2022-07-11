import React from 'react'; 
import '../scss/components/loading.scss'; 

function Loading() {
  return (
    <div className="loading-comp">
        <div className="loading-img"></div>
        <div className="background-blue-color"></div>
        <div className="load-spinner"></div>
    </div>
  )
}

export default Loading; 