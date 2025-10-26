import { data } from "../assets/data/data.js";

export const time = () => {
    const timeContainer = document.querySelector('.time');
    const footerEl = document.querySelector('footer');
    const [marriageDiv, receptionDiv] = timeContainer.querySelectorAll('div div');
    const mapLink = timeContainer.querySelector('a');
    const addressParagraph = timeContainer.querySelector('a + p');

    // Set dynamic background image from data.js if provided
    if (data?.time?.background) {
        timeContainer.style.backgroundImage = `url('${data.time.background}')`;
        timeContainer.style.backgroundPosition = 'center';
        timeContainer.style.backgroundRepeat = 'no-repeat';
        timeContainer.style.backgroundSize = 'cover';
    }

    const createTimeListItem = (title, details) => (
        `<h3>${title}</h3>
         <p>${details.day}, ${details.date} ${details.month} ${details.year} <br> 
         Pukul ${details.hours.start} WIB sd ${details.hours.finish}</p>`
    );

    marriageDiv.innerHTML = createTimeListItem('Akad', data.time.marriage);
    receptionDiv.innerHTML = createTimeListItem('Resepsi', data.time.reception);

    mapLink.href = data.link.map;
    addressParagraph.textContent = data.time.address;

    // Apply dynamic footer background if provided
    if (data?.footer?.background && footerEl) {
        footerEl.style.background = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('${data.footer.background}') center/cover no-repeat`;
        footerEl.style.color = '#fff';
    }
};
