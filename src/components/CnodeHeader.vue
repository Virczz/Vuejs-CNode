<template>
    <ul class="header">
        <router-link tag="li" to="/" class="logo"><img src="../assets/logo.svg" alt="cnode"></router-link>
        <li class="search"><input type="text" @keyup.enter="search" v-model="input"></li>
        <li class="send"><router-link to="/send">发布</router-link></li>
    </ul>
</template>

<style lang="less" scoped>
@color_1: #888;
@color_2: #fff;

.header {
	background: #444;
	display: flex;
	height: 50px;
	line-height: 50px;
	width: 100%;
	li {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.logo {
		flex: 3;
		img {
			width: 80%;
		}
	}
	.search {
		flex: 5;
		input {
			width: 100%;
			display: block;
			border: none;
			outline: none;
			background: #666;
			color: @color_1;
			height: 30px;
			line-height: 30px;
			text-indent: 10px;
			border-radius: 4px;
		}
		&:after {
			content: '';
			display: block;
			background: url(../assets/search.png?1502287834) no-repeat;
			background-position: center;
		}
	}
	.send {
		flex: 2;
		a {
			display: block;
			width: 80%;
			background: #80bd01;
			text-align: center;
			height: 30px;
			line-height: 30px;
			color: @color_2;
			border-radius: 4px;
		}
	}
}

</style>

<script>
    export default{
        data(){
            return {
                input:''
            }
        },
        methods:{
            search(){
                location.href=`https://www.google.com.hk/search?hl=zh-CN&q=site:cnodejs.org+${this.input}`
            }
        }
    }
</script>
