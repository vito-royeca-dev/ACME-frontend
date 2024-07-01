import React, { useEffect, useState } from 'react';

import { Message } from '../../types/dataTypes';
import DataTable from './index';
import MessageModal from '../modals/MessageModal';
import { deleteMessage, fetchMessages } from '../../lib/apis';

const MessageTable: React.FC = () => {
  const [zones, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      fetchMessages(setMessages);
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      getMessages();
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    getMessages();
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Message</button>
      <DataTable<Message>
        data={zones}
        columns={[
          { key: 'title', label: 'message title' },
          { key: 'body', label: 'message body' },
          { key: 'credits', label: 'Credits' },
        ]}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <MessageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MessageTable;
