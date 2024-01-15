import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

//import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/comics' element={<ComicsPage />} />
                            <Route path='/comics/:id' element={<SinglePage pageType='ComicPage' />} />
                            <Route path='/characters/:id' element={<SinglePage pageType='ChatPage' />} />
                            <Route path='*' element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;