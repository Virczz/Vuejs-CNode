<template>
	<div>
		<div v-if="loading" class="list">
	        <router-link :to="'/topic/'+collection.id"  v-for="collection in collections" :key="collection.id">
	            <div class="avatar">
	                <img :src="collection.author.avatar_url">
	            </div>
	            <ul class="main">
	                <li>
	                    <span v-if="collection.good||collection.top" class="good">{{collection.tab | tab(collection.top,collection.good)}}</span>
	                    <span v-else class="tab">{{collection.tab | tab(collection.top,collection.good)}}</span>
	                    <span class="loginname">{{collection.author.loginname}}</span>
	                </li>
	                <li>{{collection.title}}</li>
	                <li>{{collection.last_reply_at | timeAgo}}</li>
	            </ul>
	            <div class="tips">
	            <span><span class="reply-tips">{{collection.reply_count}}</span>/<span class="visit-tips">{{collection.visit_count}}</span></span>
	            </div>
	        </router-link>
            <div v-if="!collections.length" class="no-collection">没有收藏的主题</div>
		</div>
		<div class="load" v-else>
    		<img src="../assets/progress.gif">
		</div>
	</div>
</template>

<style lang="less" scoped>
@color_1: #888;
@color_2: #333;
@color_3: #fff;
@color_4: #999;
@color_5: #9e78c0;
@color_6: #b4b4b4;

.load {
	width: 100%;
	line-height: 100px;
	text-align: center;
	img {
		width: 40px;
		margin: 40px auto;
	}
}
.list {
	a {
		display: flex;
		border-bottom: 1px solid #f0f0f0;
		&:visited {
			color: @color_1;
		}
		.avatar {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 50%;
			}
		}
		.main {
			flex: 4;
			color: @color_2;
			li {
				line-height: 20px;
				margin: 8px 0;
			}
			.good {
				padding: 4px;
				border-radius: 4px;
				background: #80bd01;
				color: @color_3;
				text-align: center;
				font-weight: bold;
			}
			.tab {
				padding: 4px;
				border-radius: 4px;
				text-align: center;
				background: #e5e5e5;
				color: @color_4;
				font-weight: bold;
			}
		}
		.tips {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			color: @color_2;
			.reply-tips {
				color: @color_5;
			}
			.visit-tips {
				color: @color_6;
			}
		}
	}
}
.no-collection {
	width: 300px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	margin: 30px auto;
}

</style>

<script>
    import api from '../store/api.js'
    import utils from '../utils'
     export default{
        data(){
            return {
                loading:false,
                collections:[]
            }
        },
        filters:{
            tab(val,isTop,isGood){
               return utils.tab(val,isTop,isGood)
            },
            timeAgo(val){
                return utils.timeAgo(val)
            }
        },
        computed:{
            accesstoken(){
                return this.$store.state.accesstoken
            }
        },
        methods:{
            fetch(){
                api.getCollectTopics({
                    loginname:this.$route.params.loginname
                })
                .then((res)=>{
                    let result = res.data;
                    if(result.success){
                        this.loading = true;
                        this.collections = result.data;
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
