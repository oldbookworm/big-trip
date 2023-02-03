const createPhotoTemplate = (picture) => {
  return (
  `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    );
}

export const createEventPhotosTemplate = (pictures) => {
	if(pictures.length !== 0) {
    return (
	`<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((picture) => createPhotoTemplate(picture)).join('')};
        </div>
      </div>`
	);
  } else {
    return '';
  }
};