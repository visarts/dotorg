const fs = require('fs-extra');
const axios =  require('axios');

const pagingService = () => {
  const allAuthorsFile = 'data/allAuthors.json';

  fs.readJson(allAuthorsFile, (error, result) => {
    const allAuthors = result;

    for(let authorIndex in allAuthors) {
      const author = allAuthors[authorIndex];

      for (let contentIndex in author.content) {
        const item = author.content[contentIndex];

        if (!item.pages) {
          const htmlContent = fs.readFileSync(`content/literature/${authorIndex}/${item.fileName}.html`).toString();
          const pageSize = 2000;
          const buffer = 500;
          const pages = [];

          let lastChar = 2000;

          if (item.genre === 'poetry' || htmlContent.length < pageSize) {
            pages.push(htmlContent.length);
          } else {
            do {
              while (lastChar < htmlContent.length) {
                if (htmlContent.substring(lastChar - 4, lastChar) === '</p>' || htmlContent.substring(lastChar - 6, lastChar) === '</pre>') {
                  break;
                } else {
                  lastChar++;
                }
              }
              // check if the remainder of the content is below the buffer threshold
              if (htmlContent.slice(lastChar).length > (lastChar + buffer)) {
                page = lastChar;
                //htmlContent = htmlContent.slice(lastChar);
              } else {
                page = lastChar + buffer;
                //htmlContent = '';
              }

              pages.push(page);

              if (htmlContent.slice(lastChar).length > 1 && htmlContent.slice(lastChar).length < (lastChar + buffer)) {
                page = lastChar + buffer;
                //htmlContent = htmlContent.slice(lastChar + buffer);
                lastChar = lastChar + buffer;
                pages.push(page);
                break;
              }
              lastChar = lastChar + pageSize;

            } while (htmlContent.slice(lastChar).length > pageSize);
          }

          item.pages = pages;
        }
      }
    }

    fs.writeJson(allAuthorsFile, allAuthors);

  });
}

pagingService();
