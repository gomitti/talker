import WebSocket = require('ws')

class WebSocketClient {

    private initial_reconnect_interval:number = 1000;
    private max_reconnect_interval:number = 30000;
    private reconnect_interval:number;
    private reconnect_decay:number = 1.5;

    private protocol:string;
    private domain:string;
    private port:number;
    private timer_id:number = 0;
    private ws:WebSocket;
    /***
     * {name:string,callback:function}
     */
    private listeners:Array<any> = [];
    
	constructor(protocol:string, domain:string, port:number) {
		this.protocol = protocol;
		this.port = port;
		this.domain = domain;
		this.reconnect_interval = this.initial_reconnect_interval
		this.init()
	}
	private init() {
		if (this.ws) 
		    for (const listener of this.listeners) 
    			this.ws.removeEventListener(listener.name, listener.callback);
		
		
		const url = `${this.protocol}://${this.domain}:${this.port}`
		const ws = new WebSocket(url)
		ws.onclose = event => {
			clearTimeout(this.timer_id)
			setTimeout(() => {
				this.init()
			}, this.reconnect_interval);
			
            const decay = this.reconnect_interval * this.reconnect_decay;
			this.reconnect_interval = Math.min(this.max_reconnect_interval, decay)
		}
		ws.onopen = event => {
			this.reconnect_interval = this.initial_reconnect_interval
		}
		ws.onerror = event => {
			console.error("websocket error", event)
		}
		for (const listener of this.listeners) {
			ws.addEventListener(listener.name, listener.callback)
		}
		this.ws = ws
	}
	addEventListener(name:string, callback:any) {
		this.listeners.push({ name, callback })
		this.ws.addEventListener(name, callback)
	}
}

export = WebSocketClient;