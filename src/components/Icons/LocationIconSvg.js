function LocationIconSvg({color}) {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill={color !== null || color !== undefined ? color : '#000000'} stroke="none">
                <path d="M2351 5109 c-347 -37 -724 -190 -986 -402 -77 -62 -230 -214 -294 -292 -233 -282 -382 -646 -421 -1024 -26 -259 1 -619 72 -944 148 -688 484 -1306 993 -1826 217 -221 383 -360 640 -533 l129 -88 81 0 c74 0 85 3 140 35 260 154 704 558 942 856 466 586 731 1217 815 1944 7 61 12 215 12 345 -1 267 -15 374 -79 584 -266 879 -1121 1441 -2044 1345z m469 -1098 c135 -45 239 -110 340 -211 101 -101 166 -206 211 -340 26 -78 33 -116 37 -214 6 -136 -7 -224 -49 -340 -98 -271 -342 -481 -629 -541 -89 -19 -254 -19 -342 -1 -295 63 -538 281 -639 574 -33 95 -34 101 -34 262 0 161 1 167 34 262 83 243 264 436 495 528 125 50 184 60 341 56 126 -2 149 -6 235 -35z"/>
            </g>
        </svg>
    )
}

export default LocationIconSvg;