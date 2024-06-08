import React, { useState } from 'react';
import './Css/styles.css';
import Form from './WebPages/Form';

const App = () => {
  const [userQuery, setUserQuery] = useState('enter your query');
  const [chatResponse, setChatResponse] = useState(null);
  const [listResponse, setListResponse] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteFileName, setDeleteFileName] = useState('');
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  const clearResponses = () => {
    setChatResponse(null);
    setListResponse(null);
    setDeleteResponse(null);
    setUploadResponse(null);
  };

  const handleQuerySubmit = async () => {
    try {
      setLoading(true);
      clearResponses();
      const response = await fetch(`http://localhost:8000/api/chat?query=${encodeURIComponent(userQuery)}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setChatResponse(data);
      setCurrentChunkIndex(0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextChunk = () => {
    if (currentChunkIndex < chatResponse.response.chunk_list.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    }
  };

  const handlePrevChunk = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1);
    }
  };

  const handleFileChange = async () => {
    const selectedFile = file;
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);
      clearResponses();
      const response = await fetch('http://localhost:8000/api/upload-file/', {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setUploadResponse(data);
      console.log('File uploaded:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleListFiles = async () => {
    try {
      setLoading(true);
      clearResponses();
      const response = await fetch('http://localhost:8000/api/list-files', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setListResponse(data);
      console.log('List of files:', data);
    } catch (error) {
      console.error('Error listing files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    try {
      setLoading(true);
      clearResponses();
      const response = await fetch(`http://localhost:8000/api/delete-file/?filename=${deleteFileName}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setDeleteResponse(data);
      console.log('File deleted:', data);
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      file={file}
      setFile={setFile}
      userQuery={userQuery}
      setdeleteFileName={setDeleteFileName}
      deleteFileName={deleteFileName}
      setUserQuery={setUserQuery}
      handleQuerySubmit={handleQuerySubmit}
      handleFileChange={handleFileChange}
      chatResponse={chatResponse}
      listResponse={listResponse}
      deleteResponse={deleteResponse}
      uploadResponse={uploadResponse}
      loading={loading}
      onListFiles={handleListFiles}
      onDeleteFile={handleDeleteFile}
      onPrevChunk={handlePrevChunk}
      onNextChunk={handleNextChunk}
      currentChunkIndex={currentChunkIndex}
    />
  );
};

export default App;
