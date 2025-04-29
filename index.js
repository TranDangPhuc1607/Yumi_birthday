document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('heart');
    const bgMusic = document.getElementById('bg-music');

    // Pre-load the audio
    bgMusic.load();

    const clickEvent = ('ontouchstart' in window || navigator.maxTouchPoints) ? 'touchstart' : 'click';

    heart.addEventListener(clickEvent, function () {
        // Always reposition
        heart.style.position = 'absolute';
        heart.style.top = '10%';
        heart.style.left = '50%';
        heart.style.transform = 'translateX(-50%) rotate(-45deg)';

        // ✅ Hide heart for better media viewing on tablets/phones
        if (window.innerWidth <= 1024) {
            heart.style.display = 'none';
        }

        startAnimations();

        // Play the audio immediately after the heart click
        playBackgroundMusic();

        setTimeout(() => {
            const message = document.getElementById('message');

            // ✅ If small screen, stack text vertically
            if (window.innerWidth <= 480) {
                const original = "HAPPY BIRTHDAY KITTY THANH TUYỀN";
                const stacked = original.split(" ").join("\n");
                message.classList.add("break-vertical");
                message.textContent = stacked;
            }

            message.style.display = 'block';
            startMediaSlideshow();
        }, 1500);
    });

    // Add click event to the document to help with autoplay policy
    document.addEventListener('click', function () {
        if (bgMusic.paused) {
            playBackgroundMusic();
        }
    }, { once: true });
});

function playBackgroundMusic() {
    const bgMusic = document.getElementById('bg-music');

    // Unmute and set volume to full
    bgMusic.muted = false;
    bgMusic.volume = 1.0;

    // Use both play methods for maximum compatibility
    var playPromise = bgMusic.play();

    // Handle the promise to avoid uncaught errors
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("Audio playback started successfully");
        })
            .catch(error => {
                console.error("Audio playback failed:", error);

                // Try one more time with user interaction
                document.addEventListener('click', function handleClick() {
                    bgMusic.play();
                    document.removeEventListener('click', handleClick);
                }, { once: true });
            });
    }
}

function startAnimations() {
    document.getElementById('fireworks').style.display = 'block';
    createFireworks();
    document.getElementById('sparkles').style.display = 'block';
    createSparkles();
    document.getElementById('ripples').style.display = 'block';
    createRipples();
}

function createFireworks() {
    const container = document.getElementById('fireworks');
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.classList.add('explosion');
        el.style.top = `${Math.random() * 100}vh`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 1.5}s`;
        container.appendChild(el);
    }
}

function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.classList.add('sparkle');
        el.style.top = `${Math.random() * 100}vh`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(el);
    }
}

function createRipples() {
    const container = document.getElementById('ripples');
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.classList.add('ripple');
        el.style.top = `${Math.random() * 100}vh`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 2.5}s`;
        container.appendChild(el);
    }
}

function startMediaSlideshow() {
    const mediaList = [
        { type: 'image', src: './PUBLIC/image/IMG_20230118_014927.jpg' },
        { type: 'image', src: './PUBLIC/image/IMG_20230118_014934.jpg' },
        { type: 'image', src: './PUBLIC/image/z6555112354367_90811d151536493f05d1cdaf9613ff3f.jpg' },
        { type: 'image', src: './PUBLIC/image/z6555112363706_4fc0be773eb49c6f957945d4740fb593.jpg' },
        { type: 'image', src: './PUBLIC/image/z6555112366261_9b76ef9d947e745224449dc3bc03a774.jpg' },
        { type: 'image', src: './PUBLIC/image/z6555112371417_e277e2495908c647c038c96b29e95dfd.jpg' },
        { type: 'image', src: './PUBLIC/image/z6555112372746_4b18fb923ff963b537936ae0b9aa7c59.jpg' },
        { type: 'image', src: './PUBLIC/image/z6555112375484_a9e3199ea7d2561180300c1de117e916.jpg' },
        // { type: 'image', src: './PUBLIC/image/IMG_20240412_090535.jpg' },
        // { type: 'image', src: './PUBLIC/image/./IMG_1703077459566_1704210102499.jpg' },
        // { type: 'video', src: './PUBLIC/VIDEO/b4ecf8b6ac3b006b6c0f69c529eca42e.mp4' },
        // { type: 'video', src: './PUBLIC/VIDEO/SnapTik_App_7284972090703351047-HD.mp4' },
        // { type: 'video', src: './PUBLIC/VIDEO/SnapTik_App_7281814028060544264-HD.mp4' }
    ];

    const mediaContainer = document.getElementById('media-container');
    const videoElement = document.getElementById('media-video');
    let currentIndex = 0;

    function showNextMedia() {
        const current = mediaList[currentIndex];

        if (current.type === 'image') {
            videoElement.style.display = 'none';
            videoElement.pause();
            videoElement.removeAttribute('src');
            videoElement.load();
            mediaContainer.style.backgroundImage = `url('${current.src}')`;

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % mediaList.length;
                showNextMedia();
            }, 3000);

        } else if (current.type === 'video') {
            mediaContainer.style.backgroundImage = 'none';
            videoElement.src = current.src;
            videoElement.style.display = 'block';
            videoElement.play();

            videoElement.onended = () => {
                videoElement.style.display = 'none';
                currentIndex = (currentIndex + 1) % mediaList.length;
                showNextMedia();
            };
        }
    }

    showNextMedia();
}