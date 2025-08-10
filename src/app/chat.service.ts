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

  private baseUrl = 'http://127.0.0.1:5000'; // Flask backend URL

  constructor(private http: HttpClient) {}

  /** Send a message to the AI model */
  sendMessage(
    provider: string,
    model: string,
    apiKey: string,
    messages: ChatMessage[],
    chat_id : string
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chat`, {
      provider,
      model,
      apiKey,
      messages,
      chat_id
    });
  }

  /** Get list of available AI providers */
  getProviders(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/providers`);
  }

  /** Get models for a given provider */
  getModels(provider: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/models`, {
      params: { provider }
    });
  }

  /** Save chat history for a user/session */
  saveHistory(sessionId: string, messages: ChatMessage[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/history/save`, {
      sessionId,
      messages
    });
  }

  /** Get chat history for a user/session */
  getHistory(sessionId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/history/get`, {
      params: { sessionId }
    });
  }

  /** Clear chat history for a user/session */
  clearHistory(sessionId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/history/clear`, {
      params: { sessionId }
    });
  }

  getallChats(){
    return this.http.get<any>(`${this.baseUrl}/chat`)
  }

  createNewChat(chatId:string,title:string){
    return this.http.post<any>(`${this.baseUrl}/chat/add`,{"chat_id":chatId,"title":title},{})
  }

  getMessageOfChat(chatId:string){
    return this.http.get<any>(`${this.baseUrl}/message/${chatId}`)
  }
}
