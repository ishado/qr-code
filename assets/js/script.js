document.addEventListener('DOMContentLoaded', function() {
    const qrText = document.getElementById('qr-text');
    const qrColor = document.getElementById('qr-color');
    const qrSize = document.getElementById('qr-size');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrContainer = document.getElementById('qr-code');
    
    let qrCode = null;

    // Function to generate QR code
    function generateQRCode() {
        const text = qrText.value.trim();
        if (!text) {
            alert('الرجاء إدخال نص أو رابط');
            return;
        }

        // Clear previous QR code
        qrContainer.innerHTML = '';
        
        // Create new QR code
        qrCode = new QRCode(qrContainer, {
            text: text,
            width: parseInt(qrSize.value),
            height: parseInt(qrSize.value),
            colorDark: qrColor.value,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Show download button
        downloadBtn.classList.remove('hidden');
    }

    // Function to download QR code
    function downloadQRCode() {
        if (!qrCode) return;

        const canvas = qrContainer.querySelector('canvas');
        if (!canvas) return;

        // Create temporary link
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Event listeners
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    
    // Generate QR code when Enter key is pressed in the input field
    qrText.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
});