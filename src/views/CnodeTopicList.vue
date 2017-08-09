<template>
<div>
    <cnode-nav></cnode-nav>
    <div class="list" v-if="isSuccess" v-on:touchmove="getList">
        <router-link :to="'/topic/'+list.id"  v-for="list in lists" :key="list.id">
            <div class="avatar">
                <img :src="list.author.avatar_url">
            </div>
            <ul class="main">
                <li>
                    <span v-if="list.good||list.top" class="good">{{list.tab | tab(list.top,list.good)}}</span>
                    <span v-else class="tab">{{list.tab | tab(list.top,list.good)}}</span>
                    <span class="loginname">{{list.author.loginname}}</span>
                </li>
                <li>{{list.title}}</li>
                <li>{{list.last_reply_at | timeAgo}}</li>
            </ul>
            <div class="tips">
            <span><span class="reply-tips">{{list.reply_count}}</span>/<span class="visit-tips">{{list.visit_count}}</span></span>
            </div>
        </router-link>
        <img src="../assets/toTop.svg" @click="toTop" v-show="displayTop" class="toTop">
    </div>
    <div class="error" v-else>
        <img src="../assets/progress.gif">
    </div>
    <div class="progress" v-if="progress">
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
.error {
	width: 100%;
	line-height: 100px;
	text-align: center;
	img {
		width: 40px;
		margin: 40px auto;
	}
}
.progress {
	width: 100%;
	img {
		width: 40px;
		margin: 10px auto;
		display: block;
	}
}
.toTop {
	width: 25px;
	height: 25px;
	border-radius: 100%;
	position: fixed;
	right: 20px;
	border: none;
	top: 80%;
	display: block;
}

</style>

<script>
    import api from '../store/api.js'
    import utils from '../utils'
    import CnodeNav from '../components/CnodeNav'
    export default{
        data(){
            return {
                lists:[],
                isSuccess:false,
                page:1,
                limit:15,
                mdrender:true,
                progress:false,
                displayTop:false
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
        },
        methods:{
            fetch(page){
                api.getTopics({
                    tab:this.$route.params.tab,
                    page:page,
                    limit:this.limit,
                    mdrender:this.mdrender
                })
                .then((res)=>{
                    if(page == 1){
                        this.lists = res.data.data;
                        let topList = [];
                        let noTopList = [];
                        this.lists.forEach((item,index)=>{
                            if(item.top){
                                topList.push(item)
                            }else{
                                noTopList.push(item)
                            }
                        })
                        this.lists = topList.concat(noTopList)
                    }else{
                        this.lists = this.lists.concat(res.data.data);
                    }
                    this.isSuccess=res.data.success;
                    this.progress=false;
                    if(this.page>=3){
                        this.displayTop=true;
                    }
                })
                .catch((err)=>{
                    this.$router.push({
                        path : '/error'
                    })
                })
            },
            getList(){
                if(this.progress) return;
                let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight||document.body.clientHeight;
                if(scrollTop+clientHeight==scrollHeight){
                    this.progress=true;
                    this.fetch(++this.page);
                }
            },
            toTop(){
              if(document.documentElement && document.documentElement.scrollTop){
                  document.documentElement.scrollTop=0;
              }else{
                  document.body.scrollTop=0;
              }
              this.displayTop=false;
            }
        },
        components:{
            CnodeNav
        },
        watch:{
            $route(){
                this.page = 1;
                this.isSuccess = false;
                this.fetch(this.page);
            }
        },
        created(){
            this.isSuccess = false;
            this.fetch(this.page)
        }
    }

</script>
