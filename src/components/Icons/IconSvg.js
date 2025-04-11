function IconSvg({ color, id, width = '32px', height='32px' }) {
    return (
        <svg id={id} xmlns="http://www.w3.org/2000/svg" version="1.0" width={width} height={height} viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,31.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                <path d="M153 289 c-18 -12 -33 -29 -33 -40 0 -24 15 -24 47 1 34 26 65 25 91 -3 27 -29 28 -57 2 -90 -41 -52 -9 -67 34 -16 45 53 30 121 -34 154 -39 20 -69 19 -107 -6z" />
                <path d="M147 169 c-56 -50 -68 -71 -46 -85 13 -7 129 104 129 123 0 25 -26 13 -83 -38z" />
                <path d="M38 183 c-49 -56 -50 -103 -4 -149 27 -27 42 -34 74 -34 50 0 110 43 91 66 -9 11 -15 10 -36 -6 -33 -26 -77 -26 -103 0 -26 26 -25 51 1 84 32 41 10 77 -23 39z" />
            </g>
        </svg>
    )
}

export default IconSvg;