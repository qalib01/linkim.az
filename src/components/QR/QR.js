import { useRef } from "react"
import { QRCodeSVG } from 'qrcode.react';


const QRCode = ({ username, coverColor }) => {
    const qrRef = useRef(null);
    const profileUrl = `${process.env.REACT_APP_PROJECT_LINK}/${username}`;

    const handleDownloadQrCode = () => {
        const svg = qrRef.current.querySelector('svg');
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svg);
    
        if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
    
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${username}_qr.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="text-center">
            <div ref={qrRef}>
                <QRCodeSVG
                    value={profileUrl}
                    size={240}
                    level={'H'}
                    bgColor="#fff"
                    fgColor={coverColor}
                    title={`${username}'s QR Code`}
                    minVersion={4}
                    includeMargin={4}
                    imageSettings={{
                        src: 'http://localhost:3000/icon.svg',
                        x: undefined,
                        y: undefined,
                        height: 36,
                        width: 36,
                        border: '50%',
                        opacity: 1,
                        excavate: true,
                    }}
                />
            </div>

            <div style={{ marginTop: '1rem' }} className="d-flex gap-4 justify-content-center">
                <button
                    className="border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0"
                    type="down"
                    onClick={handleDownloadQrCode}
                    style={{
                        background: 'linear-gradient(310deg, #7928CA 0%, #FF0080 100%)',
                        color: '#fff',
                        border: 'none',
                    }}
                >
                    Yüklə
                </button>
                <button
                    className="border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0"
                    onClick={handleDownloadQrCode}
                    style={{
                        background: 'linear-gradient(310deg, #7928CA 0%, #FF0080 100%)',
                        color: '#fff',
                    }}
                >
                    Paylaş
                </button>
            </div>
        </div>
    )
}

export default QRCode;