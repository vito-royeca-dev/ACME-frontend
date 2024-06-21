import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Zone } from '../../types/types';
import GenericModal from './GenericModal';
import { FormField, ColorPickerField, CheckboxField } from '../formFields';
import { postZone, putZone } from '../../lib/apis';
import { useAlert } from '../../context/AlertContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  zoneToEdit?: Zone | null;
}

const ZoneModal: React.FC<Props> = ({ isOpen, onClose, onSave, zoneToEdit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Zone>();
  const [color, setColor] = useState<string>('#ffffff');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const alert = useAlert();

  useEffect(() => {
    if (zoneToEdit) {
      reset(zoneToEdit);
      setColor(zoneToEdit.color);
      setIsVisible(zoneToEdit.visible);
    } else {
      reset({
        id: '',
        centerLat: 0,
        centerLng: 0,
        radius: '',
        color: '#ffffff',
        message: '',
        visible: false,
        credits: 0,
      });
      setColor('#ffffff');
      setIsVisible(false);
    }
  }, [zoneToEdit, reset]);

  const onSubmit: SubmitHandler<Zone> = async (data) => {
    data.color = color;
    data.visible = isVisible;
    try {
      if (zoneToEdit) {
        await putZone(data);
      } else {
        await postZone(data);
      }
      alert.showAlert("Successfully saved!", "success");
      onSave();
    } catch (error) {
      console.error('Error saving zone:', error);
      alert.showAlert("Error saving tunnel:", "error");
    }
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose} onSave={handleSubmit(onSubmit)} title={zoneToEdit ? 'Edit Zone' : 'Add Zone'}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="centerLat" label="Center Latitude" type="number" min={-85} max={85} register={register} errors={errors} requiredMessage="Center Latitude is required" />
        <FormField id="centerLng" label="Center Longitude" type="number" min={-180} max={180} register={register} errors={errors} requiredMessage="Center Longitude is required" />
        <FormField id="radius" label="Radius" type="text" register={register} errors={errors} requiredMessage="Radius is required" />
        <ColorPickerField color={color} setColor={setColor} register={register} errors={errors} requiredMessage="Color is required" />
        <FormField id="message" label="Message" type="text" register={register} errors={errors} requiredMessage="Message is required" />
        <FormField id="credits" label="Credits" type="number" register={register} errors={errors} requiredMessage="Credits are required" />
        <CheckboxField id="visible" label="Visible" checked={isVisible} onChange={setIsVisible} />
      </form>
    </GenericModal>
  );
};

export default ZoneModal;
