const KEY = '32167466-eca24bf310fd62d926b174c37';
export async function GetPictures({ searchQuery = 'cat', page = 1 }) {
  // console.log(searchQuery, page);
  try {
    const responce = await fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (responce.ok) {
      const data = await responce.json();
      //console.dir(data);

      const result = {
        data: data.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })),
        totalHits: data.totalHits,
      };
      // console.dir(result);
      return result;
    }
  } catch (error) {
    return new Promise.reject(
      `Ошибка получения информации по запросу ${searchQuery} страница ${page}`
    );
  }
}
