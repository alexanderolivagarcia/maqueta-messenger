export type MessageType = 'General' | 'PQRS' | 'Comercial' | 'WhatsApp' | 'Soporte' | 'Info';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'incoming' | 'outgoing';
  senderName?: string;
  avatar?: string;
  subject?: string;
  typeTag?: MessageType;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: Attachment;
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
  badgeType?: 'badge' | 'initials';
  initials?: string;
  category: MessageType;
  messages: ChatMessage[];
}
