export const url = "http://localhost:3001";

export const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const niceDate = (millSecsFromEpoc) => {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
	d.setUTCSeconds(millSecsFromEpoc/1000);
  return d.toString();
}

export const arrayUnique = (array) => {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i].id === a[j].id)
              a.splice(j--, 1);
      }
  }

  return a;
}