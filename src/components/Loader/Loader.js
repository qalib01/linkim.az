function Loader() {
    return (
        <div style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{shapeRendering: 'auto', display: 'block', background: 'transparent'}}>
            <g>
                <circle strokeLinecap="round" fill="none" strokeDasharray="47.12388980384689 47.12388980384689" stroke="#0e1d2c" strokeWidth="4" r="15" cy="20" cx="20">
                    <animateTransform values="0 20 20;360 20 20" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                </circle>
            </g>
        </svg>
        </div>
    )
}

export default Loader;