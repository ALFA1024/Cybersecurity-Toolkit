// Tool Navigation
function switchTool(toolId) {
    // Hide all sections
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section and activate button
    document.getElementById(toolId).classList.add('active');
    event.target.classList.add('active');
}

// Utility: Copy to Clipboard
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element.value && !element.textContent) {
        alert('Nothing to copy!');
        return;
    }

    const text = element.value || element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy to clipboard');
    });
}

// ==================== PASSWORD STRENGTH CHECKER ====================
function checkPasswordStrength() {
    const password = document.getElementById('password-input').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const feedback = document.getElementById('feedback');

    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        feedback.innerHTML = '';
        return;
    }

    let strength = 0;
    let feedbackPoints = [];

    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;

    // Character type checks
    if (/[a-z]/.test(password)) {
        strength += 15;
    } else {
        feedbackPoints.push('Add lowercase letters (a-z)');
    }

    if (/[A-Z]/.test(password)) {
        strength += 15;
    } else {
        feedbackPoints.push('Add uppercase letters (A-Z)');
    }

    if (/[0-9]/.test(password)) {
        strength += 15;
    } else {
        feedbackPoints.push('Add numbers (0-9)');
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        strength += 15;
    } else {
        feedbackPoints.push('Add special characters (!@#$%^&*)');
    }

    // Common patterns (negative)
    if (/(.)\1{2,}/.test(password)) {
        strength -= 10;
        feedbackPoints.push('Avoid repeating characters');
    }

    if (/^[0-9]+$/.test(password) || /^[a-z]+$/.test(password) || /^[A-Z]+$/.test(password)) {
        strength -= 20;
        feedbackPoints.push('Avoid using only one type of character');
    }

    strength = Math.min(100, Math.max(0, strength));
    strengthBar.style.width = strength + '%';

    // Color and text based on strength
    if (strength < 30) {
        strengthBar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff6b6b)';
        strengthText.textContent = '🔴 Very Weak';
        strengthText.className = 'strength-text danger';
    } else if (strength < 50) {
        strengthBar.style.background = 'linear-gradient(90deg, #ffd43b, #ffd43b)';
        strengthText.textContent = '🟡 Weak';
        strengthText.className = 'strength-text warning';
    } else if (strength < 70) {
        strengthBar.style.background = 'linear-gradient(90deg, #74c0fc, #74c0fc)';
        strengthText.textContent = '🔵 Fair';
        strengthText.className = 'strength-text';
    } else if (strength < 90) {
        strengthBar.style.background = 'linear-gradient(90deg, #51cf66, #51cf66)';
        strengthText.textContent = '🟢 Good';
        strengthText.className = 'strength-text success';
    } else {
        strengthBar.style.background = 'linear-gradient(90deg, #2ecc71, #2ecc71)';
        strengthText.textContent = '✨ Excellent';
        strengthText.className = 'strength-text success';
    }

    // Display feedback
    if (feedbackPoints.length > 0) {
        feedback.innerHTML = '<strong>Suggestions:</strong><ul>' +
            feedbackPoints.map(point => `<li>${point}</li>`).join('') +
            '</ul>';
    } else {
        feedback.innerHTML = '<strong>✓ Perfect Password!</strong><p>Your password is very secure.</p>';
    }
}

function togglePasswordVisibility() {
    const input = document.getElementById('password-input');
    const btn = event.target;
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide Password';
    } else {
        input.type = 'password';
        btn.textContent = 'Show Password';
    }
}

// ==================== PASSWORD GENERATOR ====================
function generatePassword() {
    const length = parseInt(document.getElementById('pwd-length').value);
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{};\':"|,./<>?';

    let characters = '';
    if (useLowercase) characters += lowercase;
    if (useUppercase) characters += uppercase;
    if (useNumbers) characters += numbers;
    if (useSymbols) characters += symbols;

    if (characters.length === 0) {
        alert('Please select at least one character type');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById('generated-password').value = password;
}

// ==================== HASH GENERATOR ====================
// Note: Using crypto APIs available in browser
async function generateHashes() {
    const text = document.getElementById('hash-input').value;

    if (!text) {
        alert('Please enter text to hash');
        return;
    }

    const results = [];

    // SHA-1
    if (document.getElementById('sha1-hash').checked) {
        const sha1 = await hashText(text, 'SHA-1');
        results.push({ algorithm: 'SHA-1', hash: sha1 });
    }

    // SHA-256
    if (document.getElementById('sha256-hash').checked) {
        const sha256 = await hashText(text, 'SHA-256');
        results.push({ algorithm: 'SHA-256', hash: sha256 });
    }

    // SHA-512
    if (document.getElementById('sha512-hash').checked) {
        const sha512 = await hashText(text, 'SHA-512');
        results.push({ algorithm: 'SHA-512', hash: sha512 });
    }

    // MD5 (simulated - not available in SubtleCrypto)
    if (document.getElementById('md5-hash').checked) {
        const md5 = md5Hash(text);
        results.push({ algorithm: 'MD5', hash: md5 });
    }

    const resultsHtml = results.map(result =>
        `<div class="hash-item">
            <div class="hash-item-label">${result.algorithm}</div>
            <div class="hash-item-value">${result.hash}</div>
        </div>`
    ).join('');

    document.getElementById('hash-results').innerHTML = resultsHtml;
}

async function hashText(text, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple MD5 implementation
function md5Hash(str) {
    // A simple MD5 implementation
    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525550);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574957);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537795);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    }

    function ff(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function gg(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function hh(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function ii(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function add32(x, y) {
        return (x + y) >>> 0;
    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    var x = [];
    var k, v, j = 0;
    for (k = 0; k < str.length; k += 2) {
        j = str.charCodeAt(k);
        if (str.length > k + 1) {
            j |= str.charCodeAt(k + 1) << 8;
        }
        x[k >> 1] = j;
    }

    x[str.length >> 1] |= 0x80 << ((str.length % 2) * 8);
    x[(((str.length + 8) >>> 6) << 4) + 14] = str.length * 8;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (k = 0; k < x.length; k += 16) {
        v = a;
        j = b;
        var w = c;
        var z = d;
        a = md5cycle([a, b, c, d], x.slice(k, k + 16));
        d = a[3];
        c = a[2];
        b = a[1];
        a = a[0];
    }

    return decimalToHex(b) + decimalToHex(a) + decimalToHex(d) + decimalToHex(c);
}

function decimalToHex(d) {
    var hex = '';
    for (var i = 0; i < 4; i++) {
        hex += String.fromCharCode(d & 0xff);
        d >>>= 8;
    }
    return hex;
}

// ==================== BASE64 ENCODER/DECODER ====================
function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    try {
        const encoded = btoa(input);
        document.getElementById('base64-output').value = encoded;
    } catch (e) {
        alert('Error encoding: ' + e.message);
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value;
    try {
        const decoded = atob(input);
        document.getElementById('base64-output').value = decoded;
    } catch (e) {
        alert('Invalid Base64 input');
    }
}

// ==================== URL ENCODER/DECODER ====================
function encodeURL() {
    const input = document.getElementById('url-input').value;
    const encoded = encodeURIComponent(input);
    document.getElementById('url-output').value = encoded;
}

function decodeURL() {
    const input = document.getElementById('url-input').value;
    try {
        const decoded = decodeURIComponent(input);
        document.getElementById('url-output').value = decoded;
    } catch (e) {
        alert('Invalid URL encoding');
    }
}

// ==================== CIPHER TOOLS ====================
function updateCipherOptions() {
    const cipherType = document.getElementById('cipher-type').value;
    const shiftInput = document.getElementById('cipher-shift').parentElement;

    if (cipherType === 'rot13' || cipherType === 'atbash') {
        shiftInput.style.display = 'none';
    } else {
        shiftInput.style.display = 'block';
    }
}

function cipherEncode() {
    const cipherType = document.getElementById('cipher-type').value;
    const input = document.getElementById('cipher-input').value;
    const shift = parseInt(document.getElementById('cipher-shift').value);

    let output = '';

    if (cipherType === 'caesar') {
        output = caesarCipher(input, shift);
    } else if (cipherType === 'rot13') {
        output = rot13(input);
    } else if (cipherType === 'atbash') {
        output = atbash(input);
    }

    document.getElementById('cipher-output').value = output;
}

function cipherDecode() {
    const cipherType = document.getElementById('cipher-type').value;
    const input = document.getElementById('cipher-input').value;
    const shift = parseInt(document.getElementById('cipher-shift').value);

    let output = '';

    if (cipherType === 'caesar') {
        output = caesarCipher(input, -shift);
    } else if (cipherType === 'rot13') {
        output = rot13(input);
    } else if (cipherType === 'atbash') {
        output = atbash(input);
    }

    document.getElementById('cipher-output').value = output;
}

function caesarCipher(str, shift) {
    return str.split('').map(char => {
        if (/[a-z]/.test(char)) {
            return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        }
        return char;
    }).join('');
}

function rot13(str) {
    return caesarCipher(str, 13);
}

function atbash(str) {
    return str.split('').map(char => {
        if (/[a-z]/.test(char)) {
            return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
        } else if (/[A-Z]/.test(char)) {
            return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
        }
        return char;
    }).join('');
}
