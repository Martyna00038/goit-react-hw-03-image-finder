import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

const API_KEY = '41314450-564ca3ff5df330e0b06201b28';
const BASE_URL = 'https://pixabay.com/api/';

export default class Featcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      activePage: 1,
      images: [],
      selectedImageUrl: '',
      isModalOpen: false,
      isLoading: false,
    };
  }

  fetchData = async (query, page = 1) => {
    this.setState({ isLoading: true });

    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await axios.get(url);
      this.setState(prevState => ({
        images:
          page === 1
            ? response.data.hits
            : [...prevState.images, ...response.data.hits],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prev => ({ activePage: prev.activePage + 1 }));
  };

  openModal = imageUrl => {
    this.setState({
      selectedImageUrl: imageUrl,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      selectedImageUrl: '',
      isModalOpen: false,
    });
  };

  onFormSubmit = newSearchQuery => {
    this.setState({ searchQuery: newSearchQuery, images: [], activePage: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.activePage;
    const nextPage = this.state.activePage;
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchData(nextQuery, nextPage);
    }
  }

  render() {
    const { images, isLoading } = this.state;
    return (
      <div>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery images={images} onClick={this.openModal} />
        {images.length > 0 && !isLoading && (
          <Button onClick={this.loadMore} disabled={false} />
        )}
        <Modal
          isOpen={this.state.isModalOpen}
          imageUrl={this.state.selectedImageUrl}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}
