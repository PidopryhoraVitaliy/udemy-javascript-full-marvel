import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [character, setCharacter] = useState(null);
    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    const initialValues = {
        searchString: '',
    };
    const validationSchema = Yup.object({
        searchString: Yup.string()
            .min(2, 'Minimum 2 characters')
            .required('This field is required'),
    });
    const onSubmit = ({ searchString }) => {
        clearError();
        getCharacterByName(searchString)
            .then(setCharacter)
    };

    const errorMessage = error
        ? <div className="char__search-error">'some problem with connection...'</div>
        : null;

    const searchResult = (!character)
        ? null
        : (character.length > 0)
            ? <><div className="char__search-success">
                There is! Visit "{character[0].name}" page
            </div>
                <button
                    type='button'
                    className="button button__secondary"
                >
                    <div className="inner">
                        <NavLink to={`/characters/${character[0].id}`} >To page</NavLink>
                    </div>
                </button>
            </>
            : <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <label className="char__search-label" htmlFor="searchString">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="searchString"
                            name="searchString"
                        />
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="searchString" />
                </Form>
            </Formik>
            {errorMessage}
            {searchResult}
        </div>
    )
}

export default CharSearchForm;