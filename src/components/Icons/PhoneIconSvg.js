function PhoneIconSvg({color}) {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill={color !== null || color !== undefined ? color : '#000000'} stroke="none">
                <path d="M743 4996 c-317 -74 -551 -133 -578 -147 -56 -28 -110 -85 -139 -148 -19 -43 -21 -61 -19 -251 6 -890 333 -1841 891 -2594 249 -337 594 -683 937 -943 743 -562 1723 -901 2620 -907 185 -1 204 1 246 20 63 29 120 83 148 139 14 27 73 261 148 583 135 583 137 600 95 695 -26 58 -104 142 -156 169 -112 57 -1118 481 -1164 490 -65 13 -160 -7 -222 -48 -25 -17 -128 -133 -262 -298 -122 -149 -227 -278 -234 -286 -12 -12 -21 -11 -71 14 -389 190 -835 555 -1129 924 -186 233 -428 629 -398 650 5 4 133 106 284 228 329 264 355 296 355 439 0 69 -3 77 -250 654 -274 640 -282 654 -387 707 -101 51 -121 48 -715 -90z" />
            </g>
        </svg>
    )
}

export default PhoneIconSvg;