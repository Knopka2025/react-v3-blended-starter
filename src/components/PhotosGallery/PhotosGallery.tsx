import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";
import type { Photo } from "../../types/photo";

interface Props {
  photos: Photo[];
  onImageClick: (photo: Photo) => void;
}

export default function PhotosGallery({ photos, onImageClick }: Props) {
  return (
    <Grid>
      {photos.map((photo) => (
        <PhotosGalleryItem
          key={photo.id}
          photo={photo}
          onClick={() => onImageClick(photo)}
        />
      ))}
    </Grid>
  );
}
