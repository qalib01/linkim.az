function MenuBarIconSvg({color}) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g fill={color !== null || color !== undefined ? color : '#000000'}>
                <path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
            </g>
        </svg>
    );
}

export default MenuBarIconSvg;