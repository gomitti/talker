//db接続用
import {MongoClient} from "mongodb";
import * as conf from "./config.js";

//https://cloud.mongodb.comに接続する
class MongoDB{
    private client:MongoClient;
    
  constructor(){
      const uri:string =
       `mongodb+srv://${conf.MONGO_USER}:${conf.MONGO_PWD}@${conf.MONGO_LOCATION}/test?retryWrites=true&w=majority`;
      const opt =  { 
          useNewUrlParser: true,
          useUnifiedTopology:true 
      };
      this.client = new MongoClient(uri,opt);
  }

  public insert(data:any, tableName:string){
      const _client = this.client
      this.client.connect((err:Error) => {
        const collection = _client.db("beluga").collection(tableName);
        collection.insertOne(data,(err:any, result:any) =>{
            if (err) throw err;
            console.log(`result:${result.ops}`);
        });
        _client.close();
      });
  }
}

export = MongoDB;