package com.kyodream.debugger.service;

import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@Component
@ServerEndpoint("/ws/debug/info")
public class DebugWebSocket extends AbstractWS {
    @OnOpen
    public void onOpen(Session session) {
        super.onOpen(session);
    }

    public void info(AnalystsInfo debugInfo) {
        super.sendMsg(debugInfo);
    }

    @OnClose
    public void close(Session session) {
        super.close(session);
    }

}