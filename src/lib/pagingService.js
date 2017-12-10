const fs = require('fs-extra');

const pagingService = () => {
  const allAuthorsFile = 'data/prod/allAuthors.json';

  fs.readJson(allAuthorsFile, (error, result) => {
    const allAuthors = result;

    for(const authorIndex in allAuthors) {
      const author = allAuthors[authorIndex];

      for (const contentIndex in author.content) {
        const item = author.content[contentIndex];

        if (!item.pageSizes) {
          let htmlContent = fs.readFileSync(`content/literature/${authorIndex}/${item.fileName}.html`).toString();
          const pageSize = 2000;
          const buffer = 500;
          const pageSizes = [];

          if (item.genre !== 'poetry') {
            do {
              let lastChar = 2000;
              let page = 0;
              while (lastChar < htmlContent.length) {
                if (htmlContent.substring(lastChar - 4, lastChar) === '</p>' || htmlContent.substring(lastChar - 6, lastChar) === '</pre>') {
                  break;
                } else {
                  lastChar++;
                }
              }

              if (htmlContent.length > (lastChar + buffer)) {
                page = lastChar;
                htmlContent = htmlContent.slice(lastChar);
              } else {
                page = htmlContent.length;
                htmlContent = '';
              }

              pageSizes.push(page);

              if (htmlContent.length > 1 && htmlContent.length < (lastChar + buffer)) {
                page = htmlContent.length;
                htmlContent = htmlContent.slice(lastChar + buffer);
                pageSizes.push(page);
                break;
              }
            } while(htmlContent.length > pageSize);
          } else {
            pageSizes.push(htmlContent.length);
          }

          item.pageSizes = pageSizes;
        }
      }
    }

    fs.writeJson(allAuthorsFile, allAuthors);

  });
};

pagingService();
