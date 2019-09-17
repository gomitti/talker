//データ変換
interface Post{
    created_at?:number;
    from_mobile?:boolean;
    id:string;
    channel_id?:string;
    community_id?:string;
    user_id?:string;
    likes_count?:number;
    favorites_count?:string;
    text?:string;
    entities?:Entity[];
}

class Entity{}
interface User{
    /*** @name id */
    id:string;
    name:string;
    display_name:string;
    description:string;
    location:string;
    created_at:number;
    avatar_url:string;
}
interface Profile{
    location:string;
    description:string;
    theme_color:string;
    use_background_image:boolean;
    status_emoji_shortname:string;
    status_text:string;
    background_image:string;
    
}
interface Community{
    /*** @name id */
    id:string;
    name:string;
    display_name:string;
    only_admin_can_add_emoji:boolean;
    avatar_url:string;
}
interface Channel{
    /*** @name id */
    id:string;
    community_id:string;
    name:string;
    description:string;
    created_at:number;
    created_by:string;
}
class transHelper{
 
 public toStatus(data:any):any{
     const stat = data.status;
     const func = (input:Partial<Post>)=>{
        let elem = (<any>Object).assign({},input)
        return elem;
     }
     return func(stat);
 }
}