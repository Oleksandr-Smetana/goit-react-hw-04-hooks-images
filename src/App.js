import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './App.module.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default function App() {
  const [imageQuery, setImageQuery] = useState('');

  // const handleFormSubmit = imageQuery => {
  //   setImageQuery(imageQuery);
  // };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={setImageQuery} />
      <ImageGallery imageQuery={imageQuery} />
      <ToastContainer
        autoClose={4000}
        position="bottom-center"
        theme="colored"
      />
    </div>
  );
}
