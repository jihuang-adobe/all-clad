import { generateUUID } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const id = generateUUID();
  block.classList.add('carousel', 'slide', 'container');
  block.setAttribute('id', id);
  block.setAttribute('data-bs-ride', 'carousel');
  //block.setAttribute('data-bs-interval', 'false');

  const carouselItems = block.querySelectorAll(':scope > div');
  carouselItems.forEach((carouselItem, index) => {
    carouselItem.classList.add('carousel-item');

    if(index == 0) {
      carouselItem.classList.add('active');
    }

    const carouselItemRow = document.createElement('div');
    carouselItemRow.classList.add('row');

    const carouselItemColumns = carouselItem.querySelectorAll(':scope > div');

    carouselItemRow.append(...carouselItemColumns);
    carouselItem.append(carouselItemRow)

    carouselItemColumns.forEach((carouselItemColumn) => {
      carouselItemColumn.classList.add('col-lg-4', 'p-5', 'text-center');

      const carouselItemPicture = carouselItemColumn.querySelector('picture');
      const carouselItemAnchor = carouselItemColumn.querySelector('a');

      if(carouselItemAnchor) {
        carouselItemAnchor.innerHTML = '';
        carouselItemAnchor.append(carouselItemPicture);
      }
    });
  });

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  carouselInner.append(...carouselItems);

  block.innerHTML = `
    <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;
  
  block.prepend(carouselInner);
}