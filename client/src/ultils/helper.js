import icons from './icon';

const { FaStar, FaRegStar } = icons;

export const createSlug = (st) => st.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

export const formatMoney = (st) => st?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

export const renderStar = (starNumbers, size) => {
    const stars = [];
    starNumbers = Math.round(starNumbers);
    for (let i = 0; i < starNumbers; i++) {
        stars.push(<FaStar key={`star ${i}`} color='orange' size={size || 16} />);
    }
    for (let j = 0; j < (5 - starNumbers); j++) {
        stars.push(<FaRegStar key={`regstar ${j}`} color='orange' size={size || 16} />);
    }
    return stars;
}

export const secondsToHms = (d) => {
    d = Number(d) / 1000;
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    return ({ h, m, s });
}

export const validate = (payload, setInvalidFields) => {
    let invalidFields = 0;
    const formatPayload = Object.entries(payload);
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalidFields++;
            setInvalidFields(prev => [...prev, { name: arr[0], message: 'Require this field' }])
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!arr[1].match(regex)) {
                    invalidFields++;
                    setInvalidFields(prev => [...prev, { name: arr[0], message: 'Invalid email' }])
                }
                break;
            case 'password':
                if (arr[1].length < 6) {
                    invalidFields++;
                    setInvalidFields(prev => [...prev, { name: arr[0], message: 'Require a password of more than 6 characters' }])
                }
                break;
            case 'mobile':
                if (arr[1].length !== 10) {
                    invalidFields++;
                    setInvalidFields(prev => [...prev, { name: arr[0], message: 'Phone requirement has 10 characters' }])
                }
                break;
            default:
                break;
        }
    }
    return invalidFields;
}

export const generateRange = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}

export const getBase64 = (file) => {
    if (!file) return '';
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}