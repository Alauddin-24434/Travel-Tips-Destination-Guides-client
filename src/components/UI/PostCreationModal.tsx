"use client";
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAddPostMutation } from '@/redux/features/posts/postsApi';
import { Editor } from '@tinymce/tinymce-react';
import uploadImageToCloudinary from '@/utils/uploadImageToCloudinary';
import styles from './PostCreationModal.module.css';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const categories = ["Adventure", "Business Travel", "Exploration"];

const PostCreationModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [isPremium, setIsPremium] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [addPost, { isLoading }] = useAddPostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAppSelector(selectCurrentUser);
  const userId = user?._id;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      userId,
      comment: [],
      upvote: [],
      downvote: [],
      title,
      content,
      category,
      images,
      isPremium,
      isDeleted: false,
    };
    console.log(postData);
    try {
      await addPost(postData).unwrap();
      closeModal();
    } catch (error) {
      console.error("Post creation failed", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await handleImageUpload(file);
        uploadedImages.push(imageUrl);
      }
      setImages([...images, ...uploadedImages]);
    }
  };

  return (
    <>
      <button onClick={openModal} className="w-full text-left">
        <div className="border border-gray-300 rounded-full focus:outline-none cursor-pointer p-4 w-full">
          <p>What is on your mind?</p>
        </div>
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={closeModal}>
            <FaTimes />
          </button>
          <h2 className={styles.modalTitle}>Create a New Post</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />

            <div>
              <h3>Content:</h3>
              <Editor
                apiKey="1j3ub1vvw2s9b4infr505t0n3pb0qhqydmp5g421iirmt445"
                initialValue="<p>Start writing your travel guide here...</p>"
                init={{
                  height: 500,
                  width: "100%",
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image',
                  ],
                  toolbar:
                    'undo redo | styles | bold italic | link image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
                  file_picker_callback: async (callback, value, meta) => {
                    if (meta.filetype === 'image') {
                      const input = document.createElement('input');
                      input.setAttribute('type', 'file');
                      input.setAttribute('accept', 'image/*');

                      input.onchange = async () => {
                        const file = input.files ? input.files[0] : null;
                        if (file && file instanceof File) {
                          try {
                            const imageUrl = await handleImageUpload(file);
                            callback(imageUrl, { alt: 'Uploaded image' });
                          } catch (error) {
                            console.error('Image upload failed:', error);
                            alert('Image upload failed. Please try again.');
                          }
                        }
                      };

                      input.click();
                    }
                  },
                  image_caption: true,
                }}
                onEditorChange={handleEditorChange}
              />
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className={styles.premiumLabel}>
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              Mark as Premium
            </label>

            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default PostCreationModal;
