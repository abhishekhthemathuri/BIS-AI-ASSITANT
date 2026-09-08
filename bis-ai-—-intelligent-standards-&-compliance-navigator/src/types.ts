export interface IndianStandard {
  id: string;
  code: string; // e.g. "IS 17803 : 2022"
  title: string;
  category: string;
  status: 'Active' | 'Under Revision' | 'Mandatory QCO';
  year: number;
  qcoMandatory: boolean;
  qcoDate?: string;
  qcoMinistry?: string;
  scope: string;
  keyClauses: {
    number: string;
    title: string;
    summary: string;
    page: number;
  }[];
  applicableScheme: 'Scheme-I (ISI Mark)' | 'Scheme-II (CRS)' | 'FMCS' | 'Hallmarking';
  testingParameters: string[];
  relevanceKeywords: string[];
  officialDocUrl?: string;
}

export interface CertificationScheme {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  targetProducts: string[];
  procedure: {
    step: number;
    title: string;
    description: string;
  }[];
  timeline: string;
  feeEstimate: string;
  documents: string[];
  suitableFor: string;
}

export interface TestingLab {
  id: string;
  name: string;
  type: 'BIS Central Lab' | 'BIS Regional Lab' | 'NABL Accredited Partner';
  city: string;
  state: string;
  address: string;
  contactEmail: string;
  phone: string;
  standardsTested: string[]; // IS codes
  productCapabilities: string[];
  turnaroundTime: string;
  rating: number;
}

export interface WorkflowStep {
  step: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  technicalDetails: string;
  badge: string;
  metric: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  recommendedStandard?: IndianStandard;
  reasoningBreakdown?: {
    categoryMatch: string;
    rawMaterialReq: string;
    qcoStatus: string;
    consequences: string;
  };
  nextSteps?: {
    stepNumber: number;
    title: string;
    action: string;
    portalLink?: string;
  }[];
  citations?: {
    clauseNumber: string;
    documentTitle: string;
    page: number;
    excerpt: string;
    gazetteNotice?: string;
  }[];
  matchScore?: number;
}

export interface HUIDRecord {
  huid: string;
  jewellerName: string;
  hallmarkingCenter: string;
  ahcRegistrationNo: string;
  purity: string; // e.g. "22K916"
  metal: 'Gold' | 'Silver';
  articleType: string;
  hallmarkedDate: string;
  status: 'Verified Valid' | 'Revoked' | 'Invalid';
}
