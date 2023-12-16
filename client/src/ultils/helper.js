import icons from './icon';

const { FaStar, FaRegStar } = icons;

export const createSlug = (st) => st.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

export const formatMoney = (st) => st?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

export const renderStar = (starNumbers, size) => {
    const stars = [];
    for (let i = 0; i < starNumbers; i++) {
        stars.push(<FaStar key={`star ${i}`} color='orange' size={size || 16} />);
    }
    for (let j = 0; j < (5 - starNumbers); j++) {
        stars.push(<FaRegStar key={`regstar ${j}`} color='orange' size={size || 16} />);
    }
    return stars
}

export const secondsToHms = (d) => {
    d = Number(d) / 1000;
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    return ({ h, m, s });
}