<template>
<div>
   <div v-if="loading">
       <div class="userinfo">
           <div>
               <img :src="user.avatar_url" alt="loginname">
           </div>
           <div>
               <p>{{user.loginname}}</p>
               <p>注册时间{{user.create_at | timeAgo}}</p>
               <p>{{user.score}} 积分</p>
               <router-link class="collection" :to="'/collection/'+user.loginname">我的收藏>></router-link>
           </div>
       </div>
       <div class="recent_topic">
            <h1>最近创建的话题</h1>
            <div>
                <ul v-for="(topic,index) in user.recent_topics"
                    v-bind:key="index">
                    <li><img :src="topic.author.avatar_url"></li>
                    <li><router-link :to="'/topic/'+topic.id">{{topic.title}}</router-link></li>
                    <li>{{topic.last_reply_at|timeAgo}}</li>
                </ul>
            </div>
       </div>
       <div class="recent_topic">
            <h1>最近参与的话题</h1>
            <div>
                <ul v-for="(reply,index) in user.recent_replies"
                    v-bind:key="index">
                    <li><img :src="reply.author.avatar_url"></li>
                    <li><router-link :to="'/topic/'+reply.id">{{reply.title}}</router-link></li>
                    <li>{{reply.last_reply_at|timeAgo}}</li>
                </ul>
            </div>
       </div>
   </div>
   <div v-else class="load">
        <img src="../assets/progress.gif">
   </div>
</div>
</template>


<style lang="less" scoped>
@color_1: #000;
@color_2: #08c;

.load {
	width: 100%;
	line-height: 100px;
	text-align: center;
	img {
		width: 40px;
		margin: 40px auto;
	}
}
.userinfo {
	width: 100%;
	display: flex;
	.collection {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		position: absolute;
		right: 10px;
		bottom: 10px;
		color: @color_1;
		border-radius: 4px;
		text-decoration: underline;
	}
	div {
		flex: 3;
		position: relative;
		&:first-child {
			flex: 1;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				display: block;
				max-width: 50%;
			}
		}
		p {
			font-size: 14px;
			margin-bottom: 20px;
			margin-top: 10px;
			&:first-child {
				font-weight: bold;
			}
		}
	}
}
.recent_topic {
	margin-bottom: 20px;
	h1 {
		width: 100%;
		text-indent: 20px;
		line-height: 40px;
		background: #eee;
	}
	div {
		width: 100%;
		ul {
			width: 100%;
			height: 40px;
			line-height: 40px;
			display: flex;
			border-bottom: 1px solid #f0f0f0;
			li {
				flex: 1;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				&:nth-child(2) {
					flex: 4;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				img {
					height: 70%;
					display: block;
				}
				a {
					color: @color_2;
					display: block;
					width: 98%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
}

</style>


<script>
    import api from '../store/api.js'
    import utils from '../utils'
    export default{
        data(){
            return {
                loading:false,
                user:{}
            }
        },
        computed:{
            accesstoken(){
                return this.$store.state.accesstoken
            }
        },
        methods:{
            fetch(){
                api.getUser({
                    loginname:this.$route.params.loginname
                })
                .then((res)=>{
                    let result = res.data;
                    if(result.success){
                        this.loading = true;
                        this.user = result.data;
                    }else{
                        this.fetch();
                    }
                })
                .catch((err)=>{
                    this.$router.push({
                        path : '/error'
                    })
                })
            }
        },
        filters:{
            timeAgo(val){
                return utils.timeAgo(val)
            }
        },
        watch:{
            $router(){
                if(this.accesstoken){
                    this.fetch();
                }else{
                    this.$router.push({
                        path : '/login'
                    })
                }
            }
        },
        created(){
            this.fetch();
        }
    }
</script>
