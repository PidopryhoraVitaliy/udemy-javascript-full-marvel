import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup'

import './charSearchForm.scss';

const CharSearchForm = () => {
    const initialValues = {
        searchString: '',
    };
    const validationSchema = Yup.object({
        searchString: Yup.string()
            .min(2, 'Minimum 2 characters')
            .required('This field is required'),
    });
    const onSubmit = values => console.log(values);

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
                        // disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
        </div>
    )
}

export default CharSearchForm;