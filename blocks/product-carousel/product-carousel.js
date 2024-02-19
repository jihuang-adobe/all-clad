import { generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const remoteJSONNode = block.querySelector('a');

  if(remoteJSONNode) {
    remoteJSONNode.classList.add('invisible');
    const response = await fetch(remoteJSONNode.href);

    if (response.ok) {
      const productsJSON = await response.json();

      const id = generateUUID();

      const carouselDiv = document.createElement('div');
      carouselDiv.classList.add('carousel', 'slide');
      carouselDiv.setAttribute('id', id);
      carouselDiv.setAttribute('data-bs-ride', 'carousel');

      const carouselDivInner = document.createElement('div');
      carouselDivInner.classList.add('carousel-inner');

      while(productsJSON.data.length > 0) {
        const carouselItemDiv = document.createElement('div');
        carouselItemDiv.classList.add('carousel-item');

        const carouselItemRowDiv = document.createElement('div');
        carouselItemRowDiv.classList.add('row');

        carouselItemDiv.append(carouselItemRowDiv);

        carouselDivInner.append(carouselItemDiv);

        const products = productsJSON.data.splice(0, 4);

        products.forEach(element => {
            var cardDiv = document.createElement('div');
            cardDiv.classList.add('col-lg-3', 'p-3');

            var discountText = '';
            if(element['old-price']) {
              discountText = '($' + Math.floor(element['old-price'] - element['final-price']) + ' OFF)';
            }

            if(discountText) {
              cardDiv.innerHTML = `
                <span class="badge text-bg-danger">SALE</span>
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <div class="card-text"><del>$${element['old-price']}</del></div>
                  <div class="card-text text-danger">$${element['final-price']} ${discountText}</div>
                </div>
              `;
            } else {
              cardDiv.innerHTML = `
              <span class="badge"> </span>
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <div class="card-text">$${element['final-price']}</div>
                </div>
              `;
            }

            carouselItemRowDiv.append(cardDiv);
        });
      }
      
      carouselDivInner.querySelector(':scope > div').classList.add('active');

      const carouselDivInnerCount = carouselDivInner.querySelectorAll(':scope > div').length;

      if(carouselDivInnerCount > 1) {
        carouselDiv.innerHTML = `
          <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        `;
      }

      carouselDiv.prepend(carouselDivInner);

      block.append(carouselDiv);
    };
  }
}