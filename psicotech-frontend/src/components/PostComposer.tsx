import React, { useState } from 'react';

const PostComposer: React.FC<{ onPublish?: (text: string) => void }> = ({ onPublish }) => {
  const [text, setText] = useState('');
  const canPublish = text.trim().length > 0;

  return (
    <div className="mb-4">
      <textarea
        className="w-full h-20 resize-none border rounded-xl px-3 py-2 bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder="Compartilhe seus estudos, curiosidades ou peça ajuda..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end mt-2">
        <button
          className="px-4 py-1 rounded-md text-sm disabled:opacity-50 bg-gradient-to-r from-purple-400 to-pink-300 text-white"
          disabled={!canPublish}
          onClick={() => {
            if (!canPublish) return;
            onPublish?.(text.trim());
            setText('');
          }}
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

export default PostComposer;


