import { create } from 'zustand';

interface TelemetryData {
  solarGeneration: number; // kW
  loadConsumption: number; // kW
  batteryLevel: number; // %
  batteryStatus: 'charging' | 'discharging' | 'idle';
  batteryVoltage: number; // V
  batteryCurrent: number; // A
  batteryTemp: number; // °C
  gridImport: number; // kW
  gridExport: number; // kW
  revenue: number; // ₦ (Naira)
  totalSold: number; // kWh
  totalBought: number; // kWh
  carbonSaved: number; // kg
  marketPrice: number; // ₦/kWh
  inverterEfficiency: number; // %
  isCharging: boolean;
  isDischarging: boolean;
  chargeRate: number; // A
  dischargeRate: number; // A
  outputsEnabled: boolean;
}

interface TelemetryState {
  data: TelemetryData;
  history: TelemetryData[];
  updateTelemetry: (newData: Partial<TelemetryData>) => void;
  setCharging: (enabled: boolean) => void;
  setDischarging: (enabled: boolean) => void;
  setChargeRate: (rate: number) => void;
  setDischargeRate: (rate: number) => void;
  setOutputs: (enabled: boolean) => void;
  tick: () => void;
}

const INITIAL_DATA: TelemetryData = {
  solarGeneration: 5.2,
  loadConsumption: 3.8,
  batteryLevel: 75,
  batteryStatus: 'idle',
  batteryVoltage: 482.5,
  batteryCurrent: 0,
  batteryTemp: 28.4,
  gridImport: 0,
  gridExport: 1.4,
  revenue: 12500.50,
  totalSold: 420.5,
  totalBought: 85.2,
  carbonSaved: 450.2,
  marketPrice: 120.0, // ₦120 per kWh
  inverterEfficiency: 98.4,
  isCharging: false,
  isDischarging: false,
  chargeRate: 20,
  dischargeRate: 20,
  outputsEnabled: true,
};

export const useTelemetryStore = create<TelemetryState>((set) => ({
  data: INITIAL_DATA,
  history: [INITIAL_DATA],
  updateTelemetry: (newData) => set((state) => ({ 
    data: { ...state.data, ...newData } 
  })),
  setCharging: (enabled) => set((state) => ({ data: { ...state.data, isCharging: enabled, batteryStatus: enabled ? 'charging' : 'idle' } })),
  setDischarging: (enabled) => set((state) => ({ data: { ...state.data, isDischarging: enabled, batteryStatus: enabled ? 'discharging' : 'idle' } })),
  setChargeRate: (rate) => set((state) => ({ data: { ...state.data, chargeRate: rate } })),
  setDischargeRate: (rate) => set((state) => ({ data: { ...state.data, dischargeRate: rate } })),
  setOutputs: (enabled) => set((state) => ({ data: { ...state.data, outputsEnabled: enabled } })),
  tick: () => set((state) => {
    const { solarGeneration, loadConsumption, batteryLevel, isCharging, isDischarging, chargeRate, dischargeRate } = state.data;
    
    // Simulate fluctuations
    const solarFluctuation = (Math.random() - 0.5) * 0.5;
    const loadFluctuation = (Math.random() - 0.5) * 0.4;
    
    const newSolar = Math.max(0, solarGeneration + solarFluctuation);
    const newLoad = Math.max(0, loadConsumption + loadFluctuation);
    
    let newBatteryLevel = batteryLevel;
    let batteryStatus: 'charging' | 'discharging' | 'idle' = 'idle';
    let gridImport = 0;
    let gridExport = 0;
    let current = 0;
    
    const netPower = newSolar - newLoad;
    
    // Automatic logic (if not manually controlled)
    if (netPower > 0) {
      // Surplus
      if (newBatteryLevel < 100) {
        newBatteryLevel = Math.min(100, newBatteryLevel + 0.15);
        batteryStatus = 'charging';
        current = 15.5 + Math.random();
      } else {
        gridExport = netPower;
      }
    } else {
      // Deficit
      const deficit = Math.abs(netPower);
      if (newBatteryLevel > 15) {
        newBatteryLevel = Math.max(0, newBatteryLevel - 0.1);
        batteryStatus = 'discharging';
        current = -12.2 - Math.random();
      } else {
        gridImport = deficit;
      }
    }

    const newData: TelemetryData = {
      ...state.data,
      solarGeneration: Number(newSolar.toFixed(2)),
      loadConsumption: Number(newLoad.toFixed(2)),
      batteryLevel: Number(newBatteryLevel.toFixed(1)),
      batteryStatus,
      batteryVoltage: 480 + (newBatteryLevel * 0.1) + (Math.random() - 0.5),
      batteryCurrent: Number(current.toFixed(2)),
      batteryTemp: 28 + Math.sin(Date.now() / 10000) * 2,
      gridImport: Number(gridImport.toFixed(2)),
      gridExport: Number(gridExport.toFixed(2)),
      revenue: state.data.revenue + (gridExport * 0.05), // Earnings in ₦
      totalSold: state.data.totalSold + (gridExport * 0.001),
      marketPrice: 120 + Math.sin(Date.now() / 50000) * 10,
      inverterEfficiency: 98 + Math.random() * 0.5,
    };

    return {
      data: newData,
      history: [...state.history.slice(-59), newData],
    };
  }),
}));

