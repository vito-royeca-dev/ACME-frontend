import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Message } from '../../types/dataTypes';
import GenericModal from './GenericModal';
import { FormField } from '../formFields';
import { postMessage } from '../../lib/apis';
import { useAlert } from '../../context/AlertContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const MessageModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Message>();
  const alert = useAlert();

  useEffect(() => {
    reset({
      id: '',
      title: '',
      body: '',
      credits: 0,
    });
  }, [reset]);

  const onSubmit: SubmitHandler<Message> = async (data) => {
    try {
      await postMessage(data);
      alert.showAlert("Successfully saved!", "success");
      onSave();
    } catch (error) {
      console.error('Error saving message:', error);
      alert.showAlert("Error saving tunnel:", "error");
    }
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose} onSave={handleSubmit(onSubmit)} title='Add Message'>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        <FormField id="title" label="title" type="text" register={register} errors={errors} requiredMessage="message title is required" />
        <FormField id="body" label="body" type="textarea" register={register} errors={errors} requiredMessage="message body is required" />
        <FormField id="credits" label="Credits" type="number" register={register} errors={errors} requiredMessage="Credits are required" />
      </form>
    </GenericModal>
  );
};

export default MessageModal;
