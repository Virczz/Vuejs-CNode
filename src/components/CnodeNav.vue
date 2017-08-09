<template>
    <ul class="nav">
        <li @click="tabListDisplay=!tabListDisplay">
            {{currentTab}}<i class="triangle"></i>
            <ul v-show="tabListDisplay">
                <router-link tag="li" to="/topics/all">全部</router-link>
                <router-link tag="li" to="/topics/good">精华</router-link>
                <router-link tag="li" to="/topics/share">分享</router-link>
                <router-link tag="li" to="/topics/ask">问答</router-link>
                <router-link tag="li" to="/topics/job">招聘</router-link>
            </ul>
        </li>

        <router-link tag="li" :to="'/message/'+accesstoken" v-if="accesstoken">
            消息<span class="message" v-if="messageCount">{{messageCount}}</span>
        </router-link>
        <router-link tag="li" to="/login" v-else>消息</router-link>

        <li @click="aboutMeDisplay=!aboutMeDisplay" v-if="loginname">我<i class="triangle"></i>
            <ul v-show="aboutMeDisplay">
                <router-link tag="li" :to="'/user/'+loginname">我的主页</router-link>
                <li @click="loginOut">退出</li>
            </ul>
        </li>
        <router-link tag="li" to="/login" v-else>我</router-link>
    </ul>
</template>

<style lang="less" scoped>
@color_1: #80bd01;
@color_2: #fff;

.nav {
	display: flex;
	background: #f6f6f6;
	width: 100%;
	border-bottom: 1px solid #f0f0f0;
	>li {
		flex: 1;
		text-align: center;
		height: 40px;
		line-height: 40px;
		color: @color_1;
		position: relative;
		ul {
			border-top: 1px solid #f0f0f0;
			li {
				color: @color_1;
				background: #f6f6f6;
				border-bottom: 1px solid #f0f0f0;
			}
		}
		.message {
			display: block;
			width: 18px;
			height: 18px;
			background: #80bd01;
			color: @color_2;
			text-align: center;
			border-radius: 100%;
			line-height: 18px;
			position: absolute;
			right: 20px;
			top: 12px;
			font-size: 12px;
		}
	}
}
</style>

<script>
    import api from '../store/api.js'
    export default{
        data(){
            return {
                tabListDisplay:false,
                aboutMeDisplay:false
            }
        },
        computed:{
            loginname(){
                return this.$store.state.loginname
            },
            accesstoken(){
                return this.$store.state.accesstoken
            },
            currentTab(){
                return this.$store.state.tab
            },
            messageCount(){
                return this.$store.state.messageCount
            }
        },
        methods:{
            loginOut(){
                this.$store.commit('loginOut',{})
                this.$router.push({
                    path :'/login'
                })
            },
            getUserInfo(){
                let cnodeUser = JSON.parse(localStorage.getItem('cnodeUser'));
                if(cnodeUser){
                    this.$store.dispatch('getUnreadMessages',{
                        accesstoken:cnodeUser.accesstoken
                    });
                    this.$store.commit('loginIn',{
                        accesstoken:cnodeUser.accesstoken,
                        loginname:cnodeUser.loginname
                    })
                }
                this.$store.commit('currentTab',{
                    tab:this.$route.params.tab
                })
            }
        },
        watch:{
            $route(){
                this.getUserInfo();
            }
        },
        created(){
            this.getUserInfo();
        }
    }
</script>
