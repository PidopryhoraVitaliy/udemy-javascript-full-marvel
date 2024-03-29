import { useState } from 'react';
import { Helmet } from "react-helmet";
import CharInfo from "../charInfo/CharInfo"
import CharList from "../charList/CharList"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import RandomChar from "../randomChar/RandomChar"
import CharSearchForm from '../charSearchForm/charSearchForm';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharacterSelected={onCharacterSelected} selectedCharacter={selectedCharacter} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;