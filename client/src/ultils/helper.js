import icons from './icon';

const { FaStar, FaRegStar } = icons;

export const createSlug = (st) => st.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

export const formatMoney = (st) => st.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

export const renderStar = (starNumbers) => {
    const stars = [];
    for (let i = 0; i < starNumbers; i++) {
        stars.push(<FaStar color='orange' />);
    }
    for (let j = 0; j < (5 - starNumbers); j++) {
        stars.push(<FaRegStar color='orange' />);
    }
    return stars
}