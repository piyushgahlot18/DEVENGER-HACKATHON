export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  aadhaar: string;
  avatar?: string;
  location: string;
  joinedAt: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface Complaint {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  timeline: ComplaintEvent[];
  referenceNumber: string;
  department: string;
  aiSummary?: string;
}

export interface ComplaintEvent {
  id: string;
  event: string;
  description: string;
  timestamp: string;
  actor: string;
}

export interface GovernmentService {
  id: string;
  title: string;
  category: string;
  description: string;
  department: string;
  processingTime: string;
  fee: string;
  requiredDocuments: string[];
  eligibilityCriteria: string[];
  applicationUrl?: string;
  isRecommended?: boolean;
  icon: string;
  color: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt?: string;
  status: 'uploaded' | 'missing' | 'expired' | 'processing';
  size?: string;
  expiryDate?: string;
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  ministry: string;
  eligibility: string;
  benefit: string;
  deadline?: string;
  isNew?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}
