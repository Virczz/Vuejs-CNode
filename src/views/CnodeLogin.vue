<template>
    <div class="loginWrapper">
        <p>输入accesstoken</p>
        <input type="text" v-model="accesstoken">
        <a @click ="login">{{loginStatus}}</a>
    </div>
</template>


<style lang="less" scoped>
@color_1: #fff;
@background_color_1: #fff;

.loginWrapper {
	width: 98%;
	margin: 100px auto 10px;
	background: #fff;
	p {
		width: 98%;
		margin: 20px auto;
		text-align: center;
	}
	input {
		display: block;
		width: 80%;
		margin: 20px auto;
		outline: none;
		height: 30px;
		line-height: 30px;
		text-indent: 10px;
		border-radius: 4px;
		background-color: @background_color_1;
		border: 1px solid #ccc;
		-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
		-webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
		-moz-transition: border linear 0.2s, box-shadow linear 0.2s;
		-o-transition: border linear 0.2s, box-shadow linear 0.2s;
		transition: border linear 0.2s, box-shadow linear 0.2s;
	}
	a {
		display: block;
		background: #08c;
		width: 30%;
		color: @color_1;
		line-height: 40px;
		height: 40px;
		text-align: center;
		margin: 10px auto;
		border-radius: 4px;
	}
}

</style>

<script>
    import api from '../store/api.js'
    export default{
        data(){
            return {
                accesstoken:'',
                loginStatus:'登录'
            }
        },
        methods:{
            login(){
                this.loginStatus='登录中..';
                api.checkAccessToken({
                    'accesstoken':this.accesstoken
                })
                .then((res)=>{
                    if(res.data.success){
                        this.$store.commit('loginIn',{
                            accesstoken:this.accesstoken,
                            loginname:res.data.loginname
                        })
                        this.$router.push({
                            path:'/topics/all'
                        });
                    }else{
                        alert('登录失败，请检查accesstoken是否输入正确');
                        this.loginStatus = '登录';
                    }
                })
                .catch((err)=>{
                    alert(err);
                    this.loginStatus = '登录';
                })
            }
        }
    }
</script>
