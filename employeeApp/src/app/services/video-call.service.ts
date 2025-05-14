import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from './enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private hubConnection!: HubConnection;

  onInterviewInvite: (callerId: string) => void = () => { };
  onOffer: (connectionId: string, offer: RTCSessionDescriptionInit) => void = () => { };
  onAnswer: (connectionId: string, answer: RTCSessionDescriptionInit) => void = () => { };
  onIceCandidate: (connectionId: string, candidate: RTCIceCandidateInit) => void = () => { };

  connect(userId: string) {
    console.log("🔌 Attempting to connect with userId:", userId);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/videoCallHub?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('✅ SignalR connected');

        this.hubConnection.invoke('RegisterUser', userId)
          .then(() => console.log('✅ User registered successfully'))
          .catch(err => console.error('❌ RegisterUser failed', err));
      })
      .catch(err => console.error('❌ SignalR connection error:', err));

    this.hubConnection.on('InviteToInterview', (callerId: string) => {
      console.log("📩 Received invite from:", callerId);
      this.onInterviewInvite(callerId);
    });

    this.hubConnection.on('ReceiveOffer', (connectionId: string, offerJson: string) => {
      console.log("📥 Received offer for connectionId:", connectionId);
      const offer = JSON.parse(offerJson);
      this.onOffer(connectionId, offer);
    });

    this.hubConnection.on('ReceiveAnswer', (connectionId: string, answerJson: string) => {
      console.log("📥 Received answer for connectionId:", connectionId);
      const answer = JSON.parse(answerJson);
      this.onAnswer(connectionId, answer);
    });

    this.hubConnection.on('ReceiveIceCandidate', (targetUserId: string, candidateJson: string) => {
      console.log("📥 Received ICE candidate for connectionId:", targetUserId);
      const candidate = JSON.parse(candidateJson);
      this.onIceCandidate(targetUserId, candidate);
    });

    console.log("✅ Hub connection listeners registered.");
  }

  inviteToInterview(targetUserId: string, callerUserId: string) {
    console.log(`📤 Sending interview invite from ${callerUserId} to ${targetUserId}`);
    this.hubConnection.invoke('InviteToInterview', targetUserId, callerUserId)
      .then(() => {
        console.log('✅ Invite sent successfully');
      })
      .catch(err => {
        console.error('❌ Invite failed', err);
      });
  }

  sendOffer(targetUserId: string, offer: RTCSessionDescriptionInit) {
    const offerJson = JSON.stringify(offer);
    console.log("📤 Sending offer to:", targetUserId);
    this.hubConnection.invoke('SendOffer', targetUserId, offerJson)
      .then(() => {
        console.log("✅ Offer sent");
      })
      .catch(err => console.error('❌ SendOffer failed', err));
  }

  sendAnswer(targetUserId: string, answer: RTCSessionDescriptionInit) {
    const answerJson = JSON.stringify(answer);
    console.log("📤 Sending answer to:", targetUserId);
    this.hubConnection.invoke('SendAnswer', targetUserId, answerJson)
      .then(() => {
        console.log("✅ Answer sent");
      })
      .catch(err => console.error('❌ SendAnswer failed', err));
  }

  sendIceCandidate(targetUserId: string, candidate: RTCIceCandidateInit) {
    const candidateJson = JSON.stringify(candidate);
    if (this.hubConnection.state === HubConnectionState.Connected) {
      console.log("📤 Sending ICE candidate to:", targetUserId);
      this.hubConnection.invoke('SendIceCandidate', targetUserId, candidateJson)
        .then(() => {
          console.log("✅ ICE candidate sent");
        })
        .catch(err => console.error('❌ SendIceCandidate failed', err));
    } else {
      console.error('❌ Cannot send ICE candidate, connection is not in the Connected state.');
    }
  }
}
