import { useRef } from "react"
import { QRCodeCanvas } from 'qrcode.react';
import IconSvg from "../Icons/IconSvg";

const QRCode = ({ username, coverColor }) => {
    const qrRef = useRef(null);
    const profileUrl = `${process.env.REACT_APP_PROJECT_LINK}/${username}`;

    // const handleDownloadQrCode = () => {
    //     const canvas = qrRef.current.querySelector('canvas');
    //     console.log(canvas)
    //     const url = canvas.toDataURL('image/png');
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `${username}_qr.png`;
    //     a.click();
    // }

    const handleDownloadQrCode = async () => {
        const canvas = qrRef.current.querySelector('canvas');
        const context = canvas.getContext('2d');

        // 1. Convert IconSvg to image
        const svgElement = document.querySelector('#my-custom-icon-svg'); // Give your IconSvg an ID
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            // 2. Draw the logo on top of QR canvas
            const x = canvas.width / 2 - 20; // Adjust to your icon size
            const y = canvas.height / 2 - 20;
            context.fillStyle = "#fff"; // Background circle (optional)
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, 28, 0, Math.PI * 2);
            context.fill();

            context.drawImage(img, x, y, 40, 40); // Adjust width/height
            URL.revokeObjectURL(url);
            console.log(url)

            // 3. Download the final canvas
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${username}_qr.png`;
            a.click();
        };
        img.src = url;
    };


    return (
        <div className="text-center">
            <div ref={qrRef} style={{ position: 'relative', display: 'inline-block' }}>
                <QRCodeCanvas
                    value={profileUrl}
                    size={200}
                    level={'H'}
                    bgColor="#fff"
                    fgColor={coverColor}
                />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: '#fff',
                    padding: '8px'
                }}>
                    <IconSvg id='my-custom-icon-svg' color={coverColor} />
                </div>
            </div>

            <div style={{ marginTop: '1rem' }} className="d-flex gap-4 justify-content-center">
                <button
                    className="border-0 bg-transparent w-auto btn bg-gradient-primary p-2 m-0"
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