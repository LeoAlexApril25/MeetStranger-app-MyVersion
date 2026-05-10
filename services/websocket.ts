import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from './config';
import { io, Socket } from 'socket.io-client';

class WebSocketService {
    public socket: Socket | null = null;
    private _isConnected = false;

    async connect(): Promise<void> {
        const token = await AsyncStorage.getItem('authToken');

        this.socket = io(API_CONFIG.SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
        });

        return new Promise((resolve, reject) => {
            this.socket!.on('connect', () => {
                this._isConnected = true;
                console.log('WebSocket connected');
                if (token) {
                    this.socket!.emit('authenticate', { token });
                }
                resolve();
            });
            this.socket!.on('authenticated', (data) => {
                console.log(data.userId);
            });
            this.socket!.on('connect_error', (error) => {
                reject(error);
            });
            this.socket!.on('auth_error', (error) => {
                reject(error);
            });
            this.socket!.on('disconnect', () => {
                this._isConnected = false;
            });
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this._isConnected = false;
        }
    }

    joinRoom(roomId: string): void {
        this.socket?.emit('join-room', { roomId });
    }

    leaveRoom(roomId: string): void {
        this.socket?.emit('leave-room', { roomId });
    }

    sendMessage(roomId: string, message: string): void {
        this.socket?.emit('send-message', { roomId, message });
    }

    onMessage(callback: (data: any) => void): void {
        this.socket?.on('new-message', callback);
    }

    onUserJoined(callback: (data: any) => void): void {
        this.socket?.on('user-joined', callback);
    }

    oneUserLeft(callback: (data: any) => void): void {
        this.socket?.on('user-left', callback);
    }

    onMatchingFound(callback: (data: any) => void): void {
        this.socket?.on('match-found', callback);
    }

    findMatch(category: string): void {
        this.socket?.emit('find-match', { category });
    }

    cancelMatch(): void {
        this.socket?.emit('cancel-match');
    }

    removeAllListeners(): void {
        this.socket?.removeAllListeners();
    }

    get connected(): boolean {
        return this._isConnected;
    }
}

export const wsService = new WebSocketService();
