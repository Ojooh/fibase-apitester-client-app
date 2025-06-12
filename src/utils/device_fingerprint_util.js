class DeviceFingerprintUtil {
    
    // Method to generate device fingerprint (Frontend)
    generateFingerprint = () => {
        try {
            const navigator_info    = window.navigator;
            const screen_info       = window.screen;

            const data = [
                navigator_info.userAgent,
                navigator_info.language,
                navigator_info.platform,
                screen_info.height,
                screen_info.width,
                screen_info.colorDepth,
                new Date().getTimezoneOffset(),
                window.devicePixelRatio,
                this.getCanvasFingerprint(),
            ];

            const raw_string    = data.join('###');
            return this.hashString(raw_string);
        } catch (error) {
            console.error("Error generating fingerprint:", error);
            return null;
        }
    };

    // Method to validate fingerprint on the server (Backend)
    validateFingerprint = (client_fingerprint, known_fingerprint) => { return client_fingerprint === known_fingerprint; };

    // Method to detect fingerprint changes (Backend)
    hasFingerprintChanged = (old_fingerprint, new_fingerprint) => { return old_fingerprint !== new_fingerprint; };

    // Method to hash a string (simple hash function, not cryptographically secure)
    hashString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return `fp_${Math.abs(hash)}`;
    };

    // Method to get a canvas-based fingerprint (Frontend only)
    getCanvasFingerprint = () => {
        try {
            const canvas        = document.createElement('canvas');
            const ctx           = canvas.getContext('2d');
            ctx.textBaseline    = 'top';
            ctx.font            = '16px Arial';
            ctx.textBaseline    = 'alphabetic';
            ctx.fillStyle       = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle       = '#069';
            ctx.fillText('Fingerprint!', 2, 15);
            ctx.fillStyle       = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('Fingerprint!', 4, 17);

            const data_url = canvas.toDataURL();
            return data_url;
        } catch (error) {
            console.warn("Canvas fingerprinting not supported");
            return '';
        }
    };

    // ✅ New Method: Best-guess device name from user agent
    getDeviceName = () => {
        const ua = navigator.userAgent;

        if (/windows phone/i.test(ua)) return "Windows Phone";
        if (/android/i.test(ua)) return /mobile/i.test(ua) ? "Android Phone" : "Android Tablet";
        if (/iPad|Macintosh/i.test(ua) && 'ontouchend' in document) return "iPad"; // iPad on iOS 13+ appears as Mac
        if (/iPhone/i.test(ua)) return "iPhone";
        if (/Macintosh/i.test(ua)) return "Mac";
        if (/Windows NT/i.test(ua)) return "Windows PC";
        if (/Linux/i.test(ua)) return "Linux";

        return "Unknown Device";
    };
}

export default DeviceFingerprintUtil;
