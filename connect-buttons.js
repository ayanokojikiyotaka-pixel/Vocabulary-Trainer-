// Connect pronunciation to Practice Mode buttons
document.addEventListener('DOMContentLoaded', function() {
    // Find and connect Hear button
    const hearBtn = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Hear')
    );
    
    if (hearBtn) {
        hearBtn.onclick = function() {
            const wordEl = document.querySelector('.word-display, .practice-word, h2, .current-word');
            if (wordEl) {
                const word = wordEl.textContent.trim();
                window.pronunciation.speak(word);
            }
        };
    }
    
    // Connect Repeat button (speak again)
    const repeatBtn = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Repeat')
    );
    
    if (repeatBtn) {
        repeatBtn.onclick = function() {
            const wordEl = document.querySelector('.word-display, .practice-word, h2, .current-word');
            if (wordEl) {
                const word = wordEl.textContent.trim();
                window.pronunciation.speak(word);
            }
        };
    }
    
    // Connect Slow button (slower rate)
    const slowBtn = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Slow')
    );
    
    if (slowBtn) {
        slowBtn.onclick = function() {
            const wordEl = document.querySelector('.word-display, .practice-word, h2, .current-word');
            if (wordEl) {
                const word = wordEl.textContent.trim();
                window.pronunciation.speak(word, 'en-US', 0.5); // Slow rate
            }
        };
    }
    
    console.log('✅ Pronunciation connected to practice buttons');
});
