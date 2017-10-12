import React from 'react';

export default function CatSet({ cats, setPostCat, clearPostCat, selectedCat }) {
  const spanBold = { fontWeight:'bold' };
  const spanNormal = { fontWeight:'normal' };
  console.log('cats in CategorySet: ', cats);
  console.log('CategorySet typeof(cats): ', typeof(cats));
  //cats.categories.map((cat, i) => console.log('map arrow function in CategoryList: ', cat.name));
  
  //const catsParsed = JSON.parse(cats);
  //console.log('catsParsed.categories.length: ', catsParsed.categories.length);
  
  return (
    <span>Post Category:&nbsp;
	  {cats.map (
        (cat, i) =>
          <span key={i.toString()} style={selectedCat===cat.name ? spanBold : spanNormal}>
            <a href="javascript:void(0)" onClick={() => setPostCat(cat.name)}>{cat.name}</a>
            <span style={spanNormal}>{ i < cats.length-1 ? ' - ' : '' }</span>
          </span>
      )}
    </span>
  )
}