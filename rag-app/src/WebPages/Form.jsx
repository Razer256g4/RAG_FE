import React, { useState } from 'react';

const Form = ({file, setFile, deleteFileName, setdeleteFileName, userQuery, setUserQuery, handleQuerySubmit, 
  handleFileChange, chatResponse, listResponse, deleteResponse, uploadResponse, loading, onListFiles, onDeleteFile }) => {
 

  const handleSubmitQuery = () => {
    handleQuerySubmit(userQuery);
  };

  return (
    <div className="container">
      <h2 className="title">RAG model</h2>
      <div className="form">
        {/* Query Input */}
        <div>
          <label htmlFor="userQuery" className="label">Query:</label>
          <input
            type="text"
            id="userQuery"
            name="userQuery"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            className="input"
          />
          <button type="button" onClick={handleSubmitQuery} className="button">Submit Query</button>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="fileUpload" className="label">Upload File:</label>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="input"
          />
          <button type="button" onClick={handleFileChange} className="button">Upload File</button>
        </div>

        <div>
          <label htmlFor="deleteFileName" className="label">File Name</label>
          <input
            type="text"
            id="deleteFileName"
            name="deleteFileName"
            value={deleteFileName}
            onChange={(e) => setdeleteFileName(e.target.value)}
            className="input"
          />
          <button type="button" onClick={onDeleteFile} className="button">Delete Files</button>
        </div>
        {/* Other Buttons */}
        <div>
          <button type="button" onClick={onListFiles} className="button">List Files</button>
        </div>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {/* Display Responses */}
      {chatResponse && (
        <div key="chat-response" className="response">
          <h3 className="response-title">Chat Response:</h3>
          <pre className="response-data">{chatResponse.response.answer}</pre>
          <div className="chunk-list">
            <h3>Chunks:</h3>
            {chatResponse.response.chunk_list.map((chunk, index) => (
              <div key={index} className="chunk">
                <p className="chunk-number">{index + 1}</p>
                <pre className="chunk-text">{chunk}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
     
      {deleteResponse && (
        <div key="delete-response" className="response">
          <h3 className="response-title">Delete Response:</h3>
          <pre className="response-data">{JSON.stringify(deleteResponse, null, 2)}</pre>
        </div>
      )}
      {listResponse && (
        <div key="list-response" className="response">
          <h3 className="response-title">List Response:</h3>
          <pre className="response-data">{JSON.stringify(listResponse, null, 2)}</pre>
        </div>
      )}
      {uploadResponse && (
        <div key="upload-response" className="response">
          <h3 className="response-title">Upload Response:</h3>
          <pre className="response-data">{JSON.stringify(uploadResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;
