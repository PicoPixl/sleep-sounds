# Sleep Sounds - Self-Hosted Web App

A beautiful, minimalist web application for sleep, meditation, and relaxation sounds. Features a modern design with glassmorphism effects, smooth animations, and dark/light themes.

![Screenshot from 2025-07-07 01-33-35](https://github.com/user-attachments/assets/1a7a3a08-b59f-487b-9676-fbbc733dd95e)

## Features

- 🎵 **12 High-Quality Sounds** - Ocean waves, forest birds, rain, white noise, and more
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth gradients
- 🌙 **Dark/Light Mode** - Toggle between themes with persistent settings
- 🎛️ **Individual Volume Controls** - Fine-tune each sound independently
- 🔄 **Seamless Looping** - Crossfade technology for uninterrupted playback
- 💾 **Persistent Settings** - All preferences saved locally
- 📱 **Responsive Design** - Works perfectly on all devices
- 🐳 **Docker Ready** - Easy deployment with docker-compose

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd sleep-sounds
   ```

2. **Add your sound files:**
   Create a `sounds` directory and add your MP3 files with these exact names:
   - `ocean-waves.mp3`
   - `forest-birds.mp3`
   - `rain-leaves.mp3`
   - `mountain-stream.mp3`
   - `thunderstorm.mp3`
   - `crickets.mp3`
   - `wind-pines.mp3`
   - `white-noise.mp3`
   - `pink-noise.mp3`
   - `binaural-theta.mp3`
   - `singing-bowls.mp3`
   - `piano-drones.mp3`

3. **Launch with Docker:**
   ```bash
   docker-compose up -d
   ```

4. **Access the app:**
   Open your browser and navigate to `http://localhost:3000`

## Directory Structure

```
sleep-sounds/
├── docker-compose.yml
├── Dockerfile
├── index.html
├── style.css
├── script.js
├── sounds/
│   ├── ocean-waves.mp3
│   ├── forest-birds.mp3
│   ├── rain-leaves.mp3
│   ├── mountain-stream.mp3
│   ├── thunderstorm.mp3
│   ├── crickets.mp3
│   ├── wind-pines.mp3
│   ├── white-noise.mp3
│   ├── pink-noise.mp3
│   ├── binaural-theta.mp3
│   ├── singing-bowls.mp3
│   └── piano-drones.mp3
└── README.md
```

## Customization

### Adding/Removing Sounds

To modify the sound library, edit the `index.html` file:

1. **To add a sound:** Copy an existing `.sound-card` div and modify:
   - `data-sound` attribute
   - Icon SVG
   - Title and description

2. **To remove a sound:** Simply delete the corresponding `.sound-card` div

3. **To change a sound:** Replace the MP3 file in the `sounds` directory or update the `data-sound` attribute

### Customizing Appearance

- **Colors:** Edit CSS custom properties in `:root` and `[data-theme="light"]`
- **Animations:** Modify keyframes and transitions in `style.css`

## Technical Details

- **Framework:** Vanilla JavaScript (no dependencies)
- **Audio:** Web Audio API with crossfading
- **Storage:** localStorage for settings persistence
- **Container:** Nginx Alpine (lightweight)

## Browser Support

- Chrome/Edge 66+
- Firefox 60+
- Safari 12+
- Mobile browsers with Web Audio API support

## Performance

- Lazy loading of audio files
- Efficient particle rendering
- Minimal memory footprint
- Smooth 60fps animations

## Troubleshooting

**Sounds not playing:**
- Ensure MP3 files are in the `sounds` directory
- Check browser console for missing file errors
- Verify file names match exactly (case-sensitive)

**Settings not saving:**
- Ensure localStorage is enabled in browser
- Check if running in private/incognito mode

**Credits:**
- Most credits go to the BBC Rewind sound library. Check out their amazing archive at https://sound-effects.bbcrewind.co.uk/

**Additional Notes:**
- This app was created via AI (branding withheld to avoid promotion). Please use the code and learn from it!

## License

MIT License - feel free to modify and distribute!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Enjoy your peaceful sleep sounds! 🌙✨
