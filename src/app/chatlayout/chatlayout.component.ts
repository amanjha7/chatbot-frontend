import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatlayout',
  templateUrl: './chatlayout.component.html',
  styleUrls: ['./chatlayout.component.scss']
})
export class ChatlayoutComponent implements OnInit{
  allChats:any =[]
  openedChat:any=''

  constructor(
    private chatService : ChatService
  ){}

  ngOnInit(): void {
    this.chatService.getallChats().subscribe({
      next: (chats) => {
        this.allChats = chats;
        console.log("All Chats", this.allChats);

        if (!this.allChats.length) {
          this.openedChat = this.generateShortVVID();
          this.chatService.createNewChat(this.openedChat, "New Chat").subscribe({
            next: () => {
              console.log("New Chat Created");
              this.allChats = [
                { chat_id: this.openedChat, title: "New Chat" }
              ];
            }
          });
        } else if(this.openedChat == ''){
          this.openedChat = this.allChats[0]?.chat_id
        }
      },
      error: (err) => {
        console.error("Error fetching chats", err);
      }
    });
  }

  generateShortVVID() {
    const randomPart = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    return `VVID-${randomPart.toString(36)}`;
  }
}
