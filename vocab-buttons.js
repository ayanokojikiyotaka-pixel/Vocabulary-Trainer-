// Add speak buttons to My Vocabulary list
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Find all vocabulary words
        document.querySelectorAll('h3, .word, .vocab-item, strong').forEach(el => {
            if (el.textContent.trim() === 'Resilience' || 
                el.textContent.trim() === 'resilience' ||
                el.closest('.vocab-card') || 
                el.closest('.word-item')) {
                
                const word = 'Resilience'; // The word
                
                // Create button container if needed
                if (!el.parentElement.querySelector('.speak-btn-vocab')) {
                    const btn = document.createElement('button');
                    btn.innerHTML = '🔊';
                    btn.className = 'speak-btn-vocab';
                    btn.style.cssText = 'margin-left:10px;padding:5px 10px;background:#4CAF50;color:white;border:none;border-radius:5px;font-size:16px;';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        window.pronunciation.speak(word);
                        btn.style.background = '#45a049';
                        setTimeout(() => btn.style.background = '#4CAF50', 200);
                    };
                    el.appendChild(btn);
                }
            }
        });
    }, 1000);
});
