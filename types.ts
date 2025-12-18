
import React from 'react';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  imageUrl?: string;
  thought?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
