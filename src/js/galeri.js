import {data} from "../assets/data/data.js";

export const galeri = () => {
    const galeriElement = document.querySelector('.galeri');
    const showAllContainer = galeriElement.querySelector('div:nth-of-type(2)');

    const [_, figureElement, paginationElement, prevButton, nextButton, showAllButton] = galeriElement.children[0].children;
    const [__, showAllBox, closeButton] = showAllContainer.children;

    // Lightbox elements (created dynamically)
    const createLightbox = () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');

        lightbox.innerHTML = `
            <div class="lightbox__stage">
                <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#10094;</button>
                <img class="lightbox__img" alt="galeri fullscreen">
                <button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#10095;</button>
                <div class="lightbox__controls">
                    <button class="lightbox__btn" data-action="zoom-in">+</button>
                    <button class="lightbox__btn" data-action="zoom-out">-</button>
                    <button class="lightbox__btn" data-action="reset">Reset</button>
                </div>
                <button class="lightbox__close" aria-label="Close">&#10005;</button>
            </div>`;

        galeriElement.appendChild(lightbox);
        return lightbox;
    };

    const lightbox = createLightbox();
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
    const lightboxNext = lightbox.querySelector('.lightbox__nav--next');
    const lightboxControls = lightbox.querySelector('.lightbox__controls');

    let currentId = 1;
    let scale = 1;
    let tx = 0, ty = 0;
    let isDragging = false;
    let startX = 0, startY = 0;

    const applyTransform = () => {
        lightboxImg.style.setProperty('--scale', scale);
        lightboxImg.style.setProperty('--tx', `${tx}px`);
        lightboxImg.style.setProperty('--ty', `${ty}px`);
    };

    const loadById = (id) => {
        const item = data.galeri.find(i => i.id === id);
        if (!item) return;
        currentId = id;
        lightboxImg.src = item.image;
        // reset transform when loading new image
        scale = 1; tx = 0; ty = 0; applyTransform();
        updateNavigationButtons(id);
        updateGalleryImage(id);
    };

    const openLightbox = (id) => {
        loadById(id);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // zoom controls
    const ZOOM_STEP = 0.2, MIN_ZOOM = 1, MAX_ZOOM = 4;
    const zoomTo = (next) => {
        scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
        applyTransform();
    };

    // mouse/touch dragging for panning
    const onPointerDown = (x, y) => { isDragging = true; startX = x - tx; startY = y - ty; lightboxImg.style.cursor = 'grabbing'; };
    const onPointerMove = (x, y) => { if (!isDragging) return; tx = x - startX; ty = y - startY; applyTransform(); };
    const onPointerUp = () => { isDragging = false; lightboxImg.style.cursor = 'grab'; };

    // Event bindings
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => { if (currentId > 1) loadById(currentId - 1); else loadById(data.galeri.length); });
    lightboxNext.addEventListener('click', () => { if (currentId < data.galeri.length) loadById(currentId + 1); else loadById(1); });
    lightboxControls.addEventListener('click', (e) => {
        const action = e.target?.dataset?.action;
        if (!action) return;
        if (action === 'zoom-in') zoomTo(scale + ZOOM_STEP);
        if (action === 'zoom-out') zoomTo(scale - ZOOM_STEP);
        if (action === 'reset') { scale = 1; tx = 0; ty = 0; applyTransform(); }
    });

    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = Math.sign(e.deltaY);
        zoomTo(scale + (delta < 0 ? ZOOM_STEP : -ZOOM_STEP));
    }, { passive: false });

    // mouse
    lightboxImg.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onPointerUp);

    // touch
    lightboxImg.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // open by clicking the main gallery image
    figureElement.addEventListener('click', (e) => {
        const img = e.currentTarget.querySelector('img');
        if (!img) return;
        const id = parseInt(img.id, 10) || 1;
        openLightbox(id);
    });

    // keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
        if (e.key === '+') zoomTo(scale + ZOOM_STEP);
        if (e.key === '-') zoomTo(scale - ZOOM_STEP);
        if (e.key.toLowerCase() === 'r') { scale = 1; tx = 0; ty = 0; applyTransform(); }
    });

    const initializeGallery = () => {
        const initialImage = data.galeri[0];
        figureElement.innerHTML = `<img src="${initialImage.image}" alt="galeri image" id="${initialImage.id}">`;

        data.galeri.forEach((item, index) => {
            paginationElement.innerHTML += `<li data-id="${item.id}" ${index === 0 ? 'class="active"' : ''}></li>`;
        });

        updateNavigationButtons(initialImage.id);
    };

    const updateGalleryImage = (id) => {
        const selectedImage = data.galeri.find(item => item.id === id);

        if (selectedImage) {
            figureElement.innerHTML = `<img src="${selectedImage.image}" alt="galeri image" id="${selectedImage.id}">`;

            paginationElement.querySelectorAll('li').forEach((li) => {
                li.classList.toggle('active', parseInt(li.dataset.id) === id);
            });
        }
    };

    const updateNavigationButtons = (id) => {
        nextButton.dataset.id = `${id}`;
        prevButton.dataset.id = `${id}`;
    };

    const autoPlayGallery = () => {
        let id = parseInt(nextButton.dataset.id);
        id = (id < data.galeri.length) ? id + 1 : 1;
        updateNavigationButtons(id);
        updateGalleryImage(id);
    };

    nextButton.addEventListener('click', () => {
        let id = parseInt(nextButton.dataset.id);
        if (id < data.galeri.length) {
            id++;
            updateNavigationButtons(id);
            updateGalleryImage(id);
        }
    });

    prevButton.addEventListener('click', () => {
        let id = parseInt(prevButton.dataset.id);
        if (id > 1) {
            id--;
            updateNavigationButtons(id);
            updateGalleryImage(id);
        }
    });

    showAllButton.addEventListener('click', () => {
        showAllBox.innerHTML = data.galeri.map(item => `<img src="${item.image}" alt="image galeri">`).join('');
        showAllContainer.classList.add('active');
    });

    // Open lightbox when clicking an image inside the "Lihat semua foto" grid
    showAllBox.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'IMG') {
            const src = e.target.getAttribute('src');
            const found = data.galeri.find(i => i.image === src);
            if (found) {
                showAllContainer.classList.remove('active');
                openLightbox(found.id);
            }
        }
    });

    closeButton.addEventListener('click', () => {
        showAllBox.innerHTML = '';
        showAllContainer.classList.remove('active');
    });

    initializeGallery();
    setInterval(autoPlayGallery, 6000);

    paginationElement.querySelectorAll('li').forEach((pagination) => {
        pagination.addEventListener('click', (e) => {
            const id = +e.target.dataset.id;
            updateGalleryImage(id);
        })
    })
};
