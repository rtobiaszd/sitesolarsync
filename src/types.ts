export type LogLevel = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: 'WorkManager' | 'GoogleSheets' | 'NotificationManager' | 'RoomDB' | 'InverterCrawler';
  message: string;
}

export interface InverterBrand {
  name: string;
  logoUrl?: string;
  status: 'online' | 'offline';
  portalUrl: string;
  efficiency: number;
}

export interface SolarPlant {
  id: string;
  name: string;
  location: string;
  brand: string;
  capacityKWp: number;
  currentKW: number;
  status: 'ACTIVE' | 'WARNING' | 'OFFLINE';
  todayYieldKWh: number;
  co2AvoidedKg: number;
  treesPlanted: number;
}

export interface DatabaseColumn {
  name: string;
  type: string;
  constraints?: string;
  description: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: DatabaseColumn[];
}

// SaaS CRM and Pipeline structures
export interface Deal {
  id: string;
  title: string;
  plantName: string;
  brand: string;
  stageId: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: string;
  lastUpdated: string;
  value?: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  onEnterAction?: string;
  autoMoveEnabled: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
}

// SaaS Workflow Nodes
export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'ai_decision' | 'delay';
  title: string;
  description: string;
  config: {
    channel?: string;
    event?: string;
    field?: string;
    operator?: string;
    value?: string;
    actionType?: 'send_whatsapp' | 'create_jira' | 'sync_sheets' | 'trigger_notification';
    target?: string;
    template?: string;
  };
}

export interface WorkflowConnection {
  fromId: string;
  toId: string;
}

export interface Workflow {
  id: string;
  name: string;
  triggerEvent: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  active: boolean;
}

export interface ContactLead {
  name: string;
  email: string;
  company: string;
  plantsCount: string;
  phone: string;
  notes?: string;
}
