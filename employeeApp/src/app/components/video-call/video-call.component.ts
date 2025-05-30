
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatCardFooter, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { VideoCallService } from '../../services/video-call.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-call',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions],
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  candidateId: string = ''; // זה צריך להגיע מהשרת או מהמשתמש
  private localStream!: MediaStream;
  private peerConnection!: RTCPeerConnection;
  private targetConnectionId = '';
  callStarted = false;
  isMuted = false;
  isVideoOff = false;

  constructor(private videoCallService: VideoCallService, private route: ActivatedRoute) { }

  async ngOnInit() {
    console.log("[Angular] in ngOnInit video call service");
    const userId = sessionStorage.getItem('id') + '';
    console.log("[Angular] userId is:", userId);

    await this.videoCallService.connect(userId);
    this.candidateId = this.route.snapshot.paramMap.get('id') || '';

    this.videoCallService.onInterviewInvite = async (callerId: string) => {
      console.log('[Angular] 📩 Received invite from:', callerId);
      await this.startCall();
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.videoCallService.sendOffer(callerId, offer);
    };

    this.videoCallService.onOffer = async (connectionId: any, offer: any) => {
      this.targetConnectionId = connectionId;
      console.log('[Angular] 📥 Received offer for connectionId:', connectionId, 'offer:', offer);
      await this.startCall();
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.videoCallService.sendAnswer(connectionId, answer);
    };


    this.videoCallService.onAnswer = async (_, answer) => {
      console.log('[Angular] 📥 Received answer:', answer);
      await this.peerConnection.setRemoteDescription(answer);
    };


    this.videoCallService.onIceCandidate = async (_, candidate: any) => {
      if (!this.peerConnection) return;
      try {
        console.log("[Angular] 📥 Candidate received:", candidate);
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("[Angular] ❌ שגיאה בהוספת ICE Candidate:", e);
      }
    };

  }

  async startCall() {
    this.callStarted = true;
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:numb.viagenie.ca:3478',
          username: 'guest',
          credential: 'guest'
        }
      ]
    });
    this.videoCallService.onIceCandidate = async (_, candidate) => {
      if (!this.peerConnection) return;
      try {
        console.log("[Angular] 📥 Candidate received:", candidate);
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("[Angular] ❌ שגיאה בהוספת ICE Candidate:", e);
      }
    };

    this.peerConnection.ontrack = (event) => {
      console.log("🎯 [Angular] ontrack fired:", event);
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
      console.log("🎥 [Angular] Remote stream set:", this.remoteVideo.nativeElement.srcObject);
    };

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.localVideo.nativeElement.srcObject = this.localStream;
    console.log("📹 [Angular] Local stream set:", this.localVideo.nativeElement.srcObject);
  }

  async call() {
    this.targetConnectionId = this.candidateId; 
    await this.startCall();
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.videoCallService.sendOffer(this.targetConnectionId, offer);
  }

  endCall() {
    this.peerConnection.close();
    this.localStream.getTracks().forEach(track => track.stop());
    this.callStarted = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.localStream.getAudioTracks()[0].enabled = !this.isMuted;
  }

  toggleVideo() {
    this.isVideoOff = !this.isVideoOff;
    this.localStream.getVideoTracks()[0].enabled = !this.isVideoOff;
  }

  invite() {
    console.log("[Angular] inside invite");
    const callerUserId = sessionStorage.getItem('id') + "";
    console.log("[Angular] userId is:", callerUserId);
    const targetUserId = this.candidateId;
    this.videoCallService.inviteToInterview(targetUserId, callerUserId);
  }
}