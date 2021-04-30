// Methods
function setImageVars() {
  $('img').each(function () {
    const element = $(this);
    element.css('--image-width', `${this.scrollWidth}px`);
    element.css('--image-height', `${this.scrollHeight}px`);
  });
}

function initPasteButtons() {
  function paste(e) {
    const input = $(e.target).parent().find('input');
    navigator.clipboard
      .readText()
      .then((text) => input.val(text))
      .catch(() => null);
  }

  function removeButton(button) {
    $(button).parent().find('input').css('border-radius', '5px');
    $(button).remove();
  }

  $('.paste-button').each(async function () {
    try {
      if (navigator.clipboard.readText) {
        $(this).click(paste);
      } else {
        removeButton(this);
      }
    } catch {
      removeButton(this);
    }
  });
}

function renderProduct(product) {
  const { name, price, image, url } = product;

  return `
  <li>
    <a
      target="_blank"
      href="${url}"
    >
      <img
        src="${image}"
        alt="${name}"
      />
      <div class="details">
        <span class="name">${name}</span>
        <span class="price">${price}</span>
      </div>
    </a>
  </li>
  `;
}

async function loadJSON(path) {
  return new Promise((res, rej) => $.getJSON(path, res).fail(rej));
}

async function renderProducts() {
  const products = await loadJSON('../db/products.json');
  const groupProducts = await loadJSON('../db/group_products.json');

  //Render product groups
  Object.entries(groupProducts).map(([containerId, productIds]) => {
    const productGroup = products.filter((product) =>
      productIds.includes(product.id),
    );
    productGroup.forEach((product) =>
      $(`#${containerId}`).append(renderProduct(product)),
    );
  });
}

$(window).on('load', async () => {
  await renderProducts();
  setImageVars();
  initPasteButtons();
});

$(window).on('resize', () => {
  setImageVars();
});
