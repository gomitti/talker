import MongoDBconn = require('./dbConnection');
import WebSocketClient = require('./webSocketClient');

const mongo = new MongoDBconn();

const protocol:string = "wss";
const domain:string = "beluga.cx";
const port:number=8080;


const monitor = new WebSocketClient(protocol, domain, port);

monitor.addEventListener("message", (event:any) => {
	const data = JSON.parse(event.data)

	// 新しい投稿
	if (data.status_updated) {
		const { status } = data;
		mongo.insert(data,"raw_data");
		return;
	}

	// 投稿削除
	if (data.status_deleted) {
		const { id } = data;
		return;
	}

	// ふぁぼの更新
	if (data.favorites_updated) {
		const { status } = data;
		return;
	}

	// いいね
	if (data.like_created) {
		const { status } = data;
		return;
	}

	// リアクション
	if (data.reaction_added) {
		const { status } = data;
		return;
	}
})
