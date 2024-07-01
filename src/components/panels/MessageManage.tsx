import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { Message } from '../../types/dataTypes';
import MessageModal from '../modals/MessageModal';
import { deleteMessage, fetchMessages } from '../../lib/apis';
import { useAlert } from '../../context/AlertContext';

const MessageDataTable: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => fetchMessages(setMessages);

  const handleAddMessage = () => {
    setIsMessageModalOpen(true);
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteMessage(id);
      await getMessages();
      alert.showAlert("Successfully deleted!", "success");
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const columns: TableColumn<Message>[] = [
    { name: 'title', selector: row => row.title, sortable: true },
    { name: 'body', selector: row => row.body, sortable: true },
    { name: 'Credits', selector: row => row.credits, sortable: true },
    {
      name: 'Actions',
      cell: (row: Message) => (
        <div>
          <button onClick={() => handleDeleteMessage(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Message Data</h2>
      <button onClick={handleAddMessage} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Add Message</button>
      <DataTable
        columns={columns}
        data={messages}
        pagination
        highlightOnHover
      />
      <MessageModal isOpen={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} onSave={getMessages}/>
    </div>
  );
};

export default MessageDataTable;
