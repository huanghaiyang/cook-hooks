import { useState, useEffect } from 'react'

export interface BluetoothState {
    availability: boolean;
    availableTime: number;
    deAvailableTime: number;
}

interface BluetoothManager extends Readonly<BluetoothState>, EventTarget {
    onavailabilitychanged: () => void
}

export function useBluetooth(): void {

}