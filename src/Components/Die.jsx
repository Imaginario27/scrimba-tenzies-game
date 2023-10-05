/* eslint-disable react/prop-types */

export default function Die(props) {
    
     const dieFaceClassMap = {
        1: "first-face",
        2: "second-face",
        3: "third-face",
        4: "fourth-face",
        5: "fifth-face",
        6: "sixth-face"
    }
    const dieFaceClassName = dieFaceClassMap[props.value]
    
    return (   
        <div 
            className={props.isHeld ? `die ${dieFaceClassName} held ` : `die ${dieFaceClassName}`} 
            onClick={props.handleHoldDice}
        >
            {
                props.value === 1 && 
                    <div className="die-interior">
                        <span className="dot"></span>
                    </div>
            }
            {
                props.value === 2 && 
                    <div className="die-interior">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
            }
            {
                props.value === 3 && 
                    <div className="die-interior">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
            }
            {
                props.value === 4 && 
                    <div className="die-interior">
                        <div className="die-column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        <div className="die-column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
            }
            {
                props.value === 5 && 
                    <div className="die-interior">
                        <div className="die-column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        
                        <div className="die-column">
                            <span className="dot"></span>
                        </div>
                        
                        <div className="die-column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
            }
            {
                props.value === 6 && 
                    <div className="die-interior">
                        <div className="die-column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        <div className="die-column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
            }
        </div>   
    )
}