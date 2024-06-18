import { useState } from 'react';

export interface ModalData<T> {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalData: T | null;
  setModalData: (data: T | null) => void;
}

const useModal = <T>(): ModalData<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<T | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal, modalData, setModalData };
};

export default useModal;
