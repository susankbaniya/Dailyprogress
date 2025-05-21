export const handlekeypress = (e, fetch) => {
  if (e.key === 'Enter' && typeof fetch === 'function') {
    fetch();
    //sssss
}
};

       