<template>
<div>
<ul  class="messageList" v-if="loading">
    <li :class="message.has_read?'':'has-read'"
        v-for="(message,index) in messages"
        v-bind:key="index">
        <router-link :to="'/user/'+message.author.loginname">{{message.author.loginname}}</router-link>在
        <router-link :to="'/topic/'+message.topic.id">{{message.topic.title}}</router-link>中@了你
    </li>
</ul>
<div class="load" v-else>
    <img src="../assets/progress.gif">
</div>
</div>
</template>


<style lang="less" scoped>
@color_1: #08c;

.messageList {
	width: 100%;
	li {
		box-sizing: border-box;
		line-height: 20px;
		padding: 8px 10px;
		border-bottom: 1px solid #ddd;
		a {
			color: @color_1;
		}
	}
	.has-read {
		background: #eff6fa;
	}
}
.load {
	width: 100%;
	line-height: 100px;
	text-align: center;
	img {
		width: 40px;
		margin: 40px auto;
	}
}

</style>

<script>
import api from '../store/api.js'
    export default{
        data(){
            return{
                mdrender:false,
                messages:[],
                loading:false
            }
        },
        computed:{
            accesstoken(){
                return this.$route.params.accesstoken
            }
        },
        methods:{
            fetch(){
                if(this.accesstoken){
                    api.getMessages({
                        mdrender:this.mdrender,
                        accesstoken:this.accesstoken
                    })
                    .then((res)=>{
                        this.loading = true;
                        let result = res.data.data;
                        let messages = result.has_read_messages;
                        let unmessages = result.hasnot_read_messages;
                        this.messages = unmessages.concat(messages);
                    })
                    .catch((err)=>{
                        this.$router.push({
                            path : '/error'
                        })
                    })
                }
            }
        },
        watch:{
            $route(){
                this.fetch()
            }
        },
        created(){
            this.fetch()
        }
    }
</script>
