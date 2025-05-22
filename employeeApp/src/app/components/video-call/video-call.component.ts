import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatCardFooter, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { VideoCallService } from '../../services/video-call.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-call',
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardContent,MatCardActions],
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

  constructor(private videoCallService: VideoCallService,private route :ActivatedRoute) {}

  async ngOnInit() {
    console.log("in ngOnInit video call service"); 
    const userId = sessionStorage.getItem('userId')+''; // לזהות משתמש לפי התחברות
   await this.videoCallService.connect(userId);
    this.candidateId= this.route.snapshot.paramMap.get('id')||'';

    this.videoCallService.onInterviewInvite = async (callerId: string) => {
      console.log('קיבלת הזמנה מ:', callerId);
      await this.startCall();
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.videoCallService.sendOffer(callerId, offer);
    };

    this.videoCallService.onOffer = async (connectionId:any, offer:any) => {
      this.targetConnectionId = connectionId;
      await this.startCall();
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.videoCallService.sendAnswer(connectionId, answer);
    };


    this.videoCallService.onAnswer = async (_, answer) => {
      await this.peerConnection.setRemoteDescription(answer);
    };

  
    this.videoCallService.onIceCandidate = async (_, candidate:any) => {
      if (!this.peerConnection) return;
      try {
        console.log("📥 Candidate received:", candidate);
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("❌ שגיאה בהוספת ICE Candidate:", e);
      }
    };
    
  }

  async startCall() {
    this.callStarted = true;
    this.peerConnection = new RTCPeerConnection();

    this.videoCallService.onIceCandidate = async (_, candidate) => {
      if (!this.peerConnection) return;
      try {
        console.log("📥 Candidate received:", candidate);
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("❌ שגיאה בהוספת ICE Candidate:", e);
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  async call() {
    //chabge or check it
    this.targetConnectionId = this.candidateId; // זה צריך להגיע מהשרת או מהמשתמש
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
    console.log("inside invite");
    
    const callerUserId = sessionStorage.getItem('id')+"";
    console.log("userId is:", callerUserId);
     
    const targetUserId = this.candidateId;    
    this.videoCallService.inviteToInterview(targetUserId, callerUserId);
  }
}
