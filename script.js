class SleepSoundsApp {
    constructor() {
        this.audioContexts = new Map();
        this.gainNodes = new Map();
        this.currentlyPlaying = new Set();
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.preloadAudio();
    }

    loadSettings() {
        const savedTheme = localStorage.getItem('sleep-sounds-theme') || 'dark';
        const savedVolumes = JSON.parse(localStorage.getItem('sleep-sounds-volumes') || '{}');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        document.querySelectorAll('.sound-card').forEach(card => {
            const soundId = card.dataset.sound;
            const volumeSlider = card.querySelector('.volume-slider');
            const volumeValue = card.querySelector('.volume-value');
            
            if (savedVolumes[soundId]) {
                volumeSlider.value = savedVolumes[soundId];
                volumeValue.textContent = savedVolumes[soundId] + '%';
            }
        });
    }

    saveSettings() {
        const theme = document.documentElement.getAttribute('data-theme');
        const volumes = {};
        
        document.querySelectorAll('.sound-card').forEach(card => {
            const soundId = card.dataset.sound;
            const volumeSlider = card.querySelector('.volume-slider');
            volumes[soundId] = volumeSlider.value;
        });
        
        localStorage.setItem('sleep-sounds-theme', theme);
        localStorage.setItem('sleep-sounds-volumes', JSON.stringify(volumes));
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                this.saveSettings();
            });
        }

        // Sound controls
        document.querySelectorAll('.sound-card').forEach(card => {
            const soundId = card.dataset.sound;
            const playBtn = card.querySelector('.play-btn');
            const volumeSlider = card.querySelector('.volume-slider');
            const volumeValue = card.querySelector('.volume-value');

            playBtn.addEventListener('click', () => {
                if (this.currentlyPlaying.has(soundId)) {
                    this.stopSound(soundId);
                } else {
                    this.playSound(soundId);
                }
            });

            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value;
                volumeValue.textContent = volume + '%';
                this.updateVolume(soundId, volume / 100);
                this.saveSettings();
            });
        });
    }

    async playSound(soundId) {
        try {
            const card = document.querySelector(`[data-sound="${soundId}"]`);
            const playBtn = card.querySelector('.play-btn');
            const volumeSlider = card.querySelector('.volume-slider');
            
            // Create audio context if it doesn't exist
            if (!this.audioContexts.has(soundId)) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const gainNode = audioContext.createGain();
                gainNode.connect(audioContext.destination);
                
                this.audioContexts.set(soundId, audioContext);
                this.gainNodes.set(soundId, gainNode);
                
                // Load and decode audio
                const response = await fetch(`sounds/${soundId}.mp3`);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                
                // Create looping source
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = true;
                source.connect(gainNode);
                
                // Set initial volume
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(
                    volumeSlider.value / 100,
                    audioContext.currentTime + 0.5
                );
                
                source.start();
                this.audioContexts.set(soundId + '_source', source);
            }
            
            // Update UI
            playBtn.classList.add('playing');
            card.classList.add('active');
            this.currentlyPlaying.add(soundId);
            
        } catch (error) {
            console.warn(`Could not load sound: ${soundId}.mp3`);
            // You can show a user-friendly message here
        }
    }

    async stopSound(soundId) {
        const audioContext = this.audioContexts.get(soundId);
        const gainNode = this.gainNodes.get(soundId);
        
        if (audioContext && gainNode) {
            // Fade out
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            
            setTimeout(() => {
                const source = this.audioContexts.get(soundId + '_source');
                if (source) {
                    source.stop();
                    this.audioContexts.delete(soundId + '_source');
                }
                
                audioContext.close();
                this.audioContexts.delete(soundId);
                this.gainNodes.delete(soundId);
            }, 500);
        }
        
        // Update UI
        const card = document.querySelector(`[data-sound="${soundId}"]`);
        const playBtn = card.querySelector('.play-btn');
        
        playBtn.classList.remove('playing');
        card.classList.remove('active');
        this.currentlyPlaying.delete(soundId);
    }

    updateVolume(soundId, volume) {
        const gainNode = this.gainNodes.get(soundId);
        if (gainNode) {
            gainNode.gain.setValueAtTime(volume, gainNode.context.currentTime);
        }
    }

    preloadAudio() {
        // Preload a few key sounds for better UX
        const prioritySounds = ['ocean-waves', 'white-noise', 'rain-leaves'];
        
        prioritySounds.forEach(soundId => {
            const audio = new Audio(`sounds/${soundId}.mp3`);
            audio.preload = 'metadata';
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SleepSoundsApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, you might want to pause or reduce volume
    } else {
        // Page is visible again
    }
});