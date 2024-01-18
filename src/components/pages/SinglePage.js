import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import './SinglePage.scss';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({ Component, pageType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComic, getCharacter, clearError, proc: process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        clearError();
        if (pageType === 'comic') {
            getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        } else if (pageType === 'character') {
            getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }
    }

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    )
}

// const ComicView = ({ comic }) => {
//     const { title, description, thumbnail, price, pageCount, language } = comic;
//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img" />
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}$</div>
//             </div>
//             <Link to='/comics' className="single-comic__back">Back to all</Link>
//         </div>
//     )
// }

// const CharView = ({ char }) => {
//     const { name, description, thumbnail } = char;
//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={name} className="single-comic__img" />
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{name}</h2>
//                 <p className="single-comic__descr">{description}</p>
//             </div>
//             <Link to='/' className="single-comic__back">Back to all</Link>
//         </div>
//     )
// }

export default SinglePage;