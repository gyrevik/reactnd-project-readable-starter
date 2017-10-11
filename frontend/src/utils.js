export const niceDate = (millSecsFromEpoc) => {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
	d.setUTCSeconds(millSecsFromEpoc/1000);
  return d.toString();
}
