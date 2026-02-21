class PronunciationSystem {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        this.isSpeaking = false;
        this.currentWord = '';
        this.retryCount = 0;
        this.initVoices();
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => this.initVoices();
        }
    }

    initVoices() {
        this.voices = this.synthesis.getVoices();
        this.selectBestVoice();
    }

    selectBestVoice() {
        const preferred = ['Google UK English Female', 'Google UK English Male', 'Microsoft David', 'Microsoft Zira', 'Samantha', 'Google US English', 'Daniel', 'Karen'];
        for (let name of preferred) {
            const voice = this.voices.find(v => v.name.includes(name));
            if (voice) {
                this.selectedVoice = voice;
                return;
            }
        }
        this.selectedVoice = this.voices.find(v => v.lang.startsWith('en-')) || this.voices[0];
    }

    speak(word, lang = 'en-US', rate = 0.9) {
        return new Promise((resolve, reject) => {
            if (!word) return reject('No word');
            this.stop();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.voice = this.selectedVoice;
            utterance.lang = lang;
            utterance.rate = rate;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.onstart = () => {
                this.isSpeaking = true;
                this.currentWord = word;
                console.log('Speaking:', word);
            };
            utterance.onend = () => {
                this.isSpeaking = false;
                this.currentWord = '';
                resolve();
            };
            utterance.onerror = (e) => {
                this.isSpeaking = false;
                if (this.retryCount < 2) {
                    this.retryCount++;
                    setTimeout(() => this.speak(word, lang, rate).then(resolve).catch(reject), 500);
                } else {
                    this.retryCount = 0;
                    reject(e);
                }
            };
            this.synthesis.speak(utterance);
        });
    }

    stop() {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        this.isSpeaking = false;
    }
}

window.pronunciation = new PronunciationSystem();
// Force rebuild Sat Feb 21 17:13:08 +05 2026
