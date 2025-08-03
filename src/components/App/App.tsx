import { useState } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import { getPhotos } from "../../services/photos";
import type { Photo } from "../../types/photo";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getPhotos(query);
      setPhotos(data);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (photo: Photo) => {
    setModalPhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalPhoto(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text>Щось пішло не так. Спробуй ще раз.</Text>}
          {!isLoading && photos.length > 0 && (
            <PhotosGallery photos={photos} onImageClick={openModal} />
          )}
        </Container>
      </Section>

      {modalPhoto && (
        <Modal onClose={closeModal}>
          <img src={modalPhoto.src.original} alt={modalPhoto.alt} />
        </Modal>
      )}
    </>
  );
}

