/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";
import imgBanner from "../assets/img/gallery-banner.jpg";
import imgGallery1 from "../assets/img/home-gallery-1.jpg";
import imgGallery2 from "../assets/img/home-gallery-2.jpg";
import imgGallery3 from "../assets/img/home-gallery-3.jpg";
import imgGallery4 from "../assets/img/home-gallery-4.jpg";
import imgGallery5 from "../assets/img/home-gallery-5.png";
import imgGallery6 from "../assets/img/home-gallery-6.jpg";
import axios from "axios";
import { apiConfig, toBackendUrl } from "../services/api";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

// ảnh fix cứng
const staticImages: GalleryItem[] = [
  { id: -1, title: "Gallery 1", description: "", image_url: imgGallery1 },
  { id: -2, title: "Gallery 2", description: "", image_url: imgGallery2 },
  { id: -3, title: "Gallery 3", description: "", image_url: imgGallery3 },
  { id: -4, title: "Gallery 4", description: "", image_url: imgGallery4 },
  { id: -5, title: "Gallery 5", description: "", image_url: imgGallery5 },
  { id: -6, title: "Gallery 6", description: "", image_url: imgGallery6 },
];

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // fetch từ DB
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${apiConfig.baseURL}/gallery`);
      const dbItems: GalleryItem[] = (res.data.data || []).map((item: any) => ({
        id: Number(item.id),
        title: item.title || "Gallery",
        description: item.description || "",
        image_url: toBackendUrl(item.image_url),
      }));
      setGalleryItems(dbItems);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // merge tĩnh + DB
  const allItems = [...staticImages, ...galleryItems];

  // modal
  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(allItems[index].image_url);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const goToPrevious = () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : allItems.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allItems[newIndex].image_url);
  };

  const goToNext = () => {
    const newIndex =
      currentImageIndex < allItems.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allItems[newIndex].image_url);
  };

  return (
    <>
      {/* Spinner */}
      {isLoading && (
        <div className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Banner */}
      <div
        className="bg-breadcrumb position-relative"
        style={{
          backgroundImage: `url(${imgBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-12 text-center text-white">
              <h1 className="display-4 fw-bold mb-3 text-white">Our Gallery</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/gallery" className="text-white text-decoration-none">
                      Pages
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-white"
                    aria-current="page"
                  >
                    Gallery
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <ScrollAnimation
            animation="fadeInUp"
            delay={200}
            className="text-center mx-auto pb-5"
            style={{ maxWidth: "800px" }}
          >
            <h4
              className="text-primary mb-3"
              style={{ fontSize: "16px", letterSpacing: "1px" }}
            >
              Our Gallery
            </h4>
            <h1 className="display-5 mb-4 fw-bold">
              Captured Moments in Keansburg
            </h1>
            <p
              className="mb-0 fs-5"
              style={{ color: "#666666", lineHeight: "1.6" }}
            >
              Discover the joy and excitement through our visitors' favorite
              moments.
            </p>
          </ScrollAnimation>

          <div className="row g-4 padding-top-40">
            {allItems.map((item, index) => (
              <ScrollAnimation
                key={item.id}
                animation="fadeInUp"
                delay={200}
                className="col-lg-4 col-md-6 col-sm-12"
              >
                <div className="gallery-item position-relative">
                  <img
                    src={item.image_url}
                    className="img-fluid rounded w-100"
                    alt={item.title}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <div className="search-icon position-absolute">
                    <button
                      type="button"
                      className="btn btn-light btn-lg-square rounded-circle"
                      onClick={() => openImageModal(index)}
                    >
                      <i className="fas fa-search-plus"></i>
                    </button>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded position-relative"
            style={{ padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                display: "block",
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
              }}
            />

            <button
              type="button"
              className="btn btn-light position-absolute"
              style={{ top: 8, right: 8 }}
              onClick={closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              type="button"
              className="btn btn-light position-absolute"
              style={{
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                width: 50,
                height: 50,
                borderRadius: "50%",
                zIndex: 1051,
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              className="btn btn-light position-absolute"
              style={{
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                width: 50,
                height: 50,
                borderRadius: "50%",
                zIndex: 1051,
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            <div
              className="position-absolute"
              style={{
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 14,
                zIndex: 1051,
              }}
            >
              {currentImageIndex + 1} / {allItems.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
