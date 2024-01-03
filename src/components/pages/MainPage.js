import { useState } from 'react';
import CharInfo from "../charInfo/CharInfo"
import CharList from "../charList/CharList"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import RandomChar from "../randomChar/RandomChar"

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharacterSelected={onCharacterSelected} selectedCharacter={selectedCharacter} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo characterId={selectedCharacter} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;