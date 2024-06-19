import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Tunnel } from '../../types';
import GenericModal from './GenericModal';
import { FormField, ColorPickerField, CheckboxField } from '../formFields';
import { checkRoute, postTunnel, putTunnel } from '../../lib/apis';
import { useAlert } from '../../context/AlertContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  tunnelToEdit?: Tunnel | null;
}

const TunnelModal: React.FC<Props> = ({ isOpen, onClose, onSave, tunnelToEdit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Tunnel>();
  const [color, setColor] = useState<string>('#ffffff');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const alert = useAlert();
  
  useEffect(() => {
    if (tunnelToEdit) {
      reset(tunnelToEdit);
      setColor(tunnelToEdit.color);
      setIsVisible(tunnelToEdit.visible);
    } else {
      reset({
        id: '',
        startLat: 0,
        startLng: 0,
        endLat: 0,
        endLng: 0,
        color: '#ffffff',
        opacity: 1,
        message: '',
        credits: 0,
        visible: false,
      });
      setColor('#ffffff');
      setIsVisible(false);
    }
  }, [tunnelToEdit, reset]);

  const onSubmit: SubmitHandler<Tunnel> = async (data) => {
    const valid = await checkRoute([data.startLng, data.startLat], [data.endLng, data.endLat]);
    
    if (!valid) {
      alert.showAlert("Invalid Route, choose another route.", "error", "Invalid Info");
      return;
    }

    data.color = color;
    data.visible = isVisible;
    try {
      if (tunnelToEdit) {
        await putTunnel(data);
      } else {
        await postTunnel(data);
      }
      alert.showAlert("Successfully saved!", "success");
      onSave();
    } catch (error) {
      console.error('Error saving tunnel:', error);
      alert.showAlert("Error saving tunnel:", "error");
    }
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose} onSave={handleSubmit(onSubmit)} title={tunnelToEdit ? 'Edit Tunnel' : 'Add Tunnel'}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="startLat" label="Start Latitude" type="number" min={-85} max={85} register={register} errors={errors} requiredMessage="Start Latitude is required" />
        <FormField id="startLng" label="Start Longitude" type="number" min={-180} max={180} register={register} errors={errors} requiredMessage="Start Longitude is required" />
        <FormField id="endLat" label="End Latitude" type="number" min={-85} max={85} register={register} errors={errors} requiredMessage="End Latitude is required" />
        <FormField id="endLng" label="End Longitude" type="number" min={-180} max={180} register={register} errors={errors} requiredMessage="End Longitude is required" />
        <ColorPickerField color={color} setColor={setColor} register={register} errors={errors} requiredMessage="Color is required" />
        <FormField id="opacity" label="Opacity" type="number" min={0} max={1} register={register} errors={errors} requiredMessage="Opacity is required" />
        <FormField id="message" label="Message" type="text" register={register} errors={errors} requiredMessage="Message is required" />
        <FormField id="credits" label="Credits" type="number" register={register} errors={errors} requiredMessage="Credits are required" />
        <CheckboxField id="visible" label="Visible" checked={isVisible} onChange={setIsVisible} />
      </form>
    </GenericModal>
  );
};

export default TunnelModal;
