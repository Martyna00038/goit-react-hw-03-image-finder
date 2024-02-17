import { Component } from 'react';
import css from './gallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;

    return (
      <li
        className={css['gallery-item']}
        onClick={() => onClick(image.largeImageURL)}
      >
        <img src={image.webformatURL} alt="" />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
