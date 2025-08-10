import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:5000/chat'; // Flask backend URL

  constructor(private http: HttpClient) {}

  sendMessage(
    provider: string,
    model: string,
    apiKey: string,
    messages: ChatMessage[]
  ): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      provider,
      model,
      apiKey,
      messages
    });
  }
}
