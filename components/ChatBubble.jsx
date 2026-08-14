'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mdComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

export default function ChatBubble({ sender, text, children }) {
  const isUser = sender === 'user';

  let content;
  if (isUser) {
    content = <p>{text ?? children}</p>;
  } else if (text) {
    content = (
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      </div>
    );
  } else {
    content = children;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div
          className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm text-white leading-relaxed"
          style={{
            background: 'linear-gradient(135deg, #100420, #180830)',
            border: '1px solid rgba(139,92,246,0.35)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(139,92,246,0.12)',
          }}
        >
          {content}
        </div>
      ) : (
        <div
          className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139,92,246,0.1)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            color: '#c4b5d8',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
