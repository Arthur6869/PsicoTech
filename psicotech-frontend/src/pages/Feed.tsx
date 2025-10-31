// psicotech-frontend/src/pages/Feed.tsx
import React from 'react';
import PostComposer from '../components/PostComposer';

const Feed = () =>  {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Feed Inicial</h1>
      <PostComposer onPublish={(text) => {
        // Por enquanto, apenas simula publicação local
        alert('Publicação enviada: ' + text);
      }} />
      <div className="space-y-4">
        <div className="p-4 rounded-lg border bg-white">Post de exemplo no feed.</div>
        <div className="p-4 rounded-lg border bg-white">Outro post de exemplo.</div>
      </div>
    </div>
  );
};

export default Feed;