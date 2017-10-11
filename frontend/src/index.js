import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from './reducers/reducers.js';
import { Provider } from 'react-redux';
import * as ReadableAPI from './ReadableAPI';

ReadableAPI.getCategories().then((cats) => {
  //sessionStorage.setItem('booksAll', JSON.stringify(booksAll));
  console.log(`index.js: got all categories from API (${cats.length} categories)`);  

  ReadableAPI.getPosts().then((postsAll) => { 
    //this.setState({ posts:postsAll });
    //sessionStorage.setItem('booksAll', JSON.stringify(booksAll));
    console.log(`index.js: got all posts from API (${postsAll.length} posts)`);   
    
    let store = createStore(reducer, {postCat: 'all', posts: postsAll, cats: cats});
  	console.log(`index.js: store.getState(): ${store.getState()}`);
	console.log(`index.js: store.getState()['cats']: ${store.getState()['cats']}`);
	console.log(`index.js: store.getState()['posts']: ${store.getState()['posts']}`);

    ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
  	registerServiceWorker();
  });
});