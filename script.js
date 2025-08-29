AFRAME.registerComponent('bounce', {
    init: function () {
        this.el.addEventListener('collide', (e) => {
            console.log('Collided with', e.detail.body.el);
        });
    }
});


const popupData = {
    calculator: {
        title: "Calculator",
        image: "Screenshot (21).png",
        description: "This is a simple 3D calculator model that represents a grades based web calculator I made. This web calculator is specifically designed for students who are studying under Ontario, CA education system. It helps students calculate their grades based on the unique category weightings used in Ontario.",
        links: [
            { text: "Visit Me", url: "https://c22co.github.io/TDSB-Grade-Calculator/" },
        ]
    },
    camera: {
        title: "Photography",
        image: "Photography Portfolio SS.png",
        description: "This 3D model repreents a canon g7x mark ii camera that connects to a photography portfolio I made. I made this photography portfolio to showcase a couple of my favourite digitals of my friends and my memories with them :) It is also one of the my first websites I have made using HTML/CSS!",
        links: [
            { text: "Visit me", url: "https://c22co.github.io/Photography-Portfolio/" },
        ]
    }, 
    paper: {
        title: "About Me",
        image: "desk ss.png",
        description: "This paper represents a website I made about myself! It includes my hobbies, interests, and some current projects I am working on. Feel free to explore and learn more about me!",
        links: [
            { text: "Visit me", url: "https://c22co.github.io/Desk-Web/" },
        ]
    }
};


document.addEventListener('DOMContentLoaded', function () {
    const sceneEl = document.querySelector('a-scene');
    
    if (sceneEl.hasLoaded) {
        initializePopup();
    } else {
        sceneEl.addEventListener('loaded', function() {
            setTimeout(initializePopup, 100);
        });
    }
});

function initializePopup() {
    const popup = document.getElementById('popup');
    
    const calculator = document.getElementById('calc-body');
    const camera = document.getElementById('camera-body');
    const paper = document.getElementById('paper1'); // <-- fixed ID

    console.log('Initializing enhanced popup system...');

    if (calculator) {
        calculator.addEventListener('click', function (event) {
            console.log('Calculator clicked! Showing popup...');
            showPopup('calculator', event);
        });
    }

    if (camera) {
        camera.addEventListener('click', function (event) {
            console.log('Camera clicked! Showing popup...');
            showPopup('camera', event);
        });
    }

    if (paper) {
        paper.addEventListener('click', function (event) {
            console.log('Paper clicked! Showing popup...');
            showPopup('paper', event); // <-- works now
        });
    }

    popup.addEventListener('click', function(event) {
        if (event.target === popup || event.target.classList.contains('close-btn')) {
            popup.style.display = 'none';
            popup.style.transform = '';
        }
    });

    console.log('Enhanced popup system initialized successfully!');
}


function showPopup(objectType, event) {
    const popup = document.getElementById('popup');
    const data = popupData[objectType];
    
    if (!data) {
        console.error('No popup data found for:', objectType);
        return;
    }

    updatePopupContent(data);
    
    const pos = getSafePopupPosition();
    
    popup.style.left = `${pos.x}px`;
    popup.style.top = `${pos.y}px`;
    popup.style.transform = ''; 
    popup.style.display = 'block';
    
    console.log('Popup positioned at:', pos);
}

function updatePopupContent(data) {
    const popup = document.getElementById('popup');
    
    const popupHTML = `
        <div class="popup-header">
            <h3>${data.title}</h3>
            <button class="close-btn" onclick="closePopup()">&times;</button>
        </div>
        <div class="popup-content">
            <img src="${data.image}" alt="${data.title}" class="popup-image" onerror="this.style.display='none'">
            <p class="popup-description">${data.description}</p>
            <div class="popup-links">
                ${data.links.map(link => 
                    `<a href="${link.url}" target="_blank" class="popup-link">${link.text}</a>`
                ).join('')}
            </div>
        </div>
    `;
    
    popup.innerHTML = popupHTML;
}
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    popup.style.transform = '';
    console.log('Popup closed');
}

function getSafePopupPosition() {
    const popup = document.getElementById('popup');
    
    popup.style.visibility = 'hidden';
    popup.style.display = 'block';
    
    const popupRect = popup.getBoundingClientRect();
    const popupWidth = popupRect.width || 350; 
    const popupHeight = popupRect.height || 400;
    
    popup.style.display = 'none';
    popup.style.visibility = 'visible';
    
    const margin = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = (viewportWidth - popupWidth) / 2;
    let y = (viewportHeight - popupHeight) / 2;
    
    x = Math.max(margin, Math.min(x, viewportWidth - popupWidth - margin));
    y = Math.max(margin, Math.min(y, viewportHeight - popupHeight - margin));
    
    return { x: Math.round(x), y: Math.round(y) };
}
document.addEventListener('click', function(event) {
    window.lastClickX = event.clientX;
    window.lastClickY = event.clientY;
});
