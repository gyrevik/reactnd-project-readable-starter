import React from 'react';
import { Link } from 'react-router-dom';

export default function CatViewLinks({ cats, setViewCat, selectedCat }) {
  const spanBold = { fontWeight:'bold' };
  const spanNormal = { fontWeight:'normal' };
  console.log('cats in CatViewLinks: ', cats);
  console.log('CatViewLinks typeof(cats): ', typeof(cats));
  
  return (
    <div>
      View Category:{' '}
	      {cats.map ((cat, i) =>
  		    <span key={Math.random()} style={selectedCat===cat.name ? spanBold : spanNormal}>
    	      <Link to="/category" key={i.toString()} onClick={() => setViewCat(cat.name)}>
		        {cat.name}
		      </Link>
			  <span>{ i < cats.length-1 ? ' - ' : '' }</span>
			</span>
		  )}
    </div>  
  )
}