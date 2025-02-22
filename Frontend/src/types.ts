export interface AlgorithmIdentificationHistory {
  id: string;
  data: string;
  timestamp: string;
  correctData: boolean;
  predictedAlgorithm: string;
}

export interface PopupProps {
  item: AlgorithmIdentificationHistory | null;
  onClose: () => void;
  onEdit: (id: string, correctData: boolean) => void; // Added onEdit prop
}