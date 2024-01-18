import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './SinglePage.scss';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({ Component, pageType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        clearError();
        if (pageType === 'comic') {
            getComic(id).then(onDataLoaded);
        } else if (pageType === 'character') {
            getCharacter(id).then(onDataLoaded);
        }
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
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