document.addEventListener('DOMContentLoaded', () => {
    // Make windows draggable
    const windows = document.querySelectorAll('.window, .section-window');
    windows.forEach(makeWindowDraggable);

    // Setup folder clicks
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const section = folder.dataset.section;
            const window = document.getElementById(`${section}-window`);
            window.classList.add('active');
        });
    });

    // Setup close buttons
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const window = button.closest('.section-window');
            if (window) {
                window.classList.remove('active');
            }
        });
    });

    // Create project cards
    createProjectCards();
    createProjectDetailPages();
});

function makeWindowDraggable(window) {
    const header = window.querySelector('.window-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === header || e.target.parentElement === header) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, window);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
}

function createProjectCards() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => showProjectDetail(project.id);
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                ${project.type === '' ? `
                    
                        Vidéo
                    </div>
                ` : ''}
            </div>
            <div class="project-info">
                <div class="project-title">${project.title}</div>
                <div class="project-description">${project.shortDescription}</div>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

function createProjectDetailPages() {
    const container = document.getElementById('project-details');
    if (!container) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const detailPage = document.createElement('div');
        detailPage.className = 'project-detail';
        detailPage.id = `project-${project.id}`;

        let mediaContent = '';
        if (project.type === 'video' && project.videoId) {
            mediaContent = `
                <div class="project-detail-video">
                    <div class="project-detail-video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/${project.videoId}"
                            title="${project.title}"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            `;
        } else if (project.type === 'photo-gallery' && project.photos) {
            mediaContent = `
                <div class="photo-grid">
                    ${project.photos.map(photo => `
                        <div class="photo-item">
                            <img src="${photo}" alt="${project.title}">
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (project.type === 'interactive' && project.playerContent) {
            mediaContent = `
                <div class="music-player">
                    <div class="title-bar">
                        <h3>Music Player</h3>
                    </div>
                    
                    <div class="now-playing">
                        <div class="album-art">
                            <img src="${project.playerContent.songs[0].image}" alt="Album cover" id="albumArt">
                        </div>
                        
                        <div class="track-info">
                            <h4 id="artist">${project.playerContent.songs[0].artist}</h4>
                            <p id="song">${project.playerContent.songs[0].song}</p>
                        </div>
                        
                        <div class="controls">
                            <button id="prev">‹</button>
                            <button id="play">▶</button>
                            <button id="next">›</button>
                        </div>
                    </div>

                    <div class="playlist">
                        <ul>
                            ${project.playerContent.songs.map((song, index) => `
                                <li class="${index === 0 ? 'active' : ''}">${song.song} - ${song.artist}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="visualizer">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
            `;
        } else {
            mediaContent = `<img src="${project.image}" alt="${project.title}" class="project-detail-image">`;
        }

        detailPage.innerHTML = `
            <button class="back-button" onclick="hideProjectDetail(${project.id})">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Retour
            </button>
            <div class="project-detail-content">
                <h1 class="project-detail-title">${project.title}</h1>
                ${mediaContent}
                <p class="project-detail-description">${project.description}</p>
            </div>
        `;

        container.appendChild(detailPage);

        // Initialize music player if it's the interactive project
        if (project.type === 'interactive' && project.playerContent) {
            initializeMusicPlayer(project.id, project.playerContent.songs);
        }
    });
}

function showProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
        detailPage.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
        detailPage.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initializeMusicPlayer(projectId, songs) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (!detailPage) return;

    const playButton = detailPage.querySelector('#play');
    const prevButton = detailPage.querySelector('#prev');
    const nextButton = detailPage.querySelector('#next');
    const albumArt = detailPage.querySelector('#albumArt');
    const artistElement = detailPage.querySelector('#artist');
    const songElement = detailPage.querySelector('#song');
    const playlist = detailPage.querySelectorAll('.playlist li');
    
    let currentSongIndex = 0;
    let isPlaying = false;

    function updateSong(index) {
        playlist.forEach(item => item.classList.remove('active'));
        playlist[index].classList.add('active');
        albumArt.src = songs[index].image;
        artistElement.textContent = songs[index].artist;
        songElement.textContent = songs[index].song;
        currentSongIndex = index;
    }

    playButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playButton.textContent = isPlaying ? '⏸' : '▶';
        
        const bars = detailPage.querySelectorAll('.visualizer .bar');
        bars.forEach(bar => {
            bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
        });
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updateSong(currentSongIndex);
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateSong(currentSongIndex);
    });

    playlist.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateSong(index);
        });
    });
}

// Make functions available globally
window.showProjectDetail = showProjectDetail;
window.hideProjectDetail = hideProjectDetail;