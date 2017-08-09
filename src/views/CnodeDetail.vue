<template>
  <div>
    <div v-if="isLoading">
      <h1 class="title">
        <div>
          <span v-if="detail.good||detail.top" class="good">{{detail.tab | tab(detail.top,detail.good)}}</span>
          <span v-else class="tab">{{detail.tab | tab(detail.top,detail.good)}}</span>
        </div>
        <div>{{detail.title}}</div>
      </h1>
      <div class="info">
        <span>发布于{{detail.create_at | timeAgo}}</span>
        <span>作者:{{detail.author.loginname}}</span>
        <span>{{detail.visit_count}}次浏览</span>
      </div>
      <div v-html="contenthtml" class="markdown-body"></div>
      <template v-if="this.accesstoken">
        <div class="collect decollect" @click="decollect" v-if="detail.is_collect">
          <span>取消收藏</span>
        </div>
        <div class="collect" @click="collect" v-else>
          <span>收藏</span>
        </div>
      </template>
      <div class="reply-num">
        <span>{{detail.reply_count}}</span>个回复</div>
      <div v-if="detail.reply_count">
        <div class="reply-lists" v-for="(reply,index) in detail.replies" v-bind:key="index">
          <div class="reply-list">
            <ul>
              <li>
                <img :src="reply.author.avatar_url">
              </li>
              <li>{{reply.author.loginname}}
                <span class="time">{{index+1}}楼 {{reply.create_at | timeAgo}}</span>
              </li>
              <li @click="up(reply.id,index)">
                <img src="../assets/like.svg" class="like">
                <span v-if="reply.ups.length">{{reply.ups.length}}</span>顶</li>
            </ul>
            <div v-html="repliesContent[index]" class="markdown-body"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="msg" v-else>
      <img src="../assets/progress.gif">
    </div>
  </div>
</template>

<style lang="less" scoped>
@color_1: #999;
@color_2: #fff;
@color_3: #aaa;
@color_4: #333;
@color_5: #08c;

.markdown-body {
	box-sizing: border-box;
	margin: 0 auto;
	padding: 10px;
}
.msg {
	width: 100%;
	margin: 30px auto;
	text-align: center;
	img {
		width: 40px;
		margin: 40px auto;
	}
}
.title {
	line-height: 30px;
	padding: 10px;
	display: flex;
	div {
		flex: 7;
		font-size: 20px;
		&:first-child {
			flex: 1;
		}
	}
	span {
		padding: 4px;
		border-radius: 4px;
		text-align: center;
		background: #e5e5e5;
		color: @color_1;
		font-weight: bold;
		font-size: 14px;
	}
	.good {
		padding: 4px;
		border-radius: 4px;
		background: #80bd01;
		color: @color_2;
		text-align: center;
		font-weight: bold;
	}
}
.info {
	display: inline-flex;
	width: 100%;
	padding: 0 10px;
	span {
		flex: 1;
		text-align: center;
		color: @color_3;
		font-size: 12px;
	}
}
.collect {
	width: 100%;
	height: 40px;
	text-align: right;
	line-height: 40px;
	span {
		padding: 10px 20px;
		border-radius: 4px;
		background: #80bd01;
		color: @color_2;
		text-align: center;
		font-weight: bold;
		margin-right: 10px;
	}
}
.decollect {
	span {
		background: #eee;
		color: @color_4;
	}
}
.reply-num {
	width: 100%;
	padding: 0 10px;
	line-height: 40px;
	height: 40px;
	color: @color_3;
	span {
		margin-right: 4px;
	}
}
.reply-lists {
	width: 100%;
	padding: 10px;
	overflow: auto;
	.reply-list {
		border-top: 1px solid #eee;
	}
	ul {
		display: flex;
		li {
			flex: 1;
			display: flex;
			height: 40px;
			line-height: 40px;
			justify-content: center;
			align-items: center;
			&:nth-child(2) {
				flex: 6;
				justify-content: flex-start;
			}
		}
		img {
			width: 50%;
		}
		img.like {
			width: 14px;
			margin-right: 4px;
		}
	}
	div {
		line-height: 20px;
	}
}
.time {
	color: @color_5;
	margin-left: 10px;
}

</style>


<script>
import api from '../store/api.js'
import utils from '../utils'
import 'github-markdown-css'
export default {
  data() {
    return {
      detail: null,
      isLoading: false
    }
  },
  computed: {
    contenthtml() {
      return utils.mdToHtml(this.detail.content)
    },
    repliesContent() {
      let replies = [];
      if (this.detail) {
        this.detail.replies.forEach((item) => {
          replies.push(utils.mdToHtml(item.content));
        })
      }
      return replies;
    },
    accesstoken() {
      return this.$store.state.accesstoken
    },
    is_collect() {
      return this.detail.is_collect
    }
  },
  filters: {
    tab(val, isTop, isGood) {
      return utils.tab(val, isTop, isGood)
    },
    timeAgo(val) {
      return utils.timeAgo(val)
    },
    mdToHtml(val) {
      return utils.mdToHtml(val)
    }
  },
  methods: {
    fetch() {
      api.getTopic({
        'accesstoken': this.$route.params.topicId,
        'mdrender': false
      })
        .then((res) => {
          let result = res.data;
          this.isLoading = true;
          if (result.success) {
            this.detail = result.data;
          }
        })
        .catch((err) => {
          alert(err.message);
          this.$router.push({
            'path': '/error'
          })
        })
    },
    collect() {
      api.collectTopic({
        accesstoken: this.accesstoken,
        topic_id: this.$route.params.topicId
      })
        .then((res) => {
          let result = res.data;
          if (result.success) {
            this.detail.is_collect = false
          }
        })
    },
    decollect() {
      api.deCollectTopic({
        accesstoken: this.accesstoken,
        topic_id: this.$route.params.topicId
      })
        .then((res) => {
          let result = res.data;
          if (result.success) {
            this.detail.is_collect = true
          }
        })
    },
    up(replyId, index) {
      if (!this.accesstoken) {
        alert('请先登录!');
        this.$router.push({
          path: '/login'
        })
        return;
      }
      api.upReply({
        accesstoken: this.accesstoken,
        reply_id: replyId
      })
        .then((res) => {
          let result = res.data;
          if (result.success) {
            if (result.action == 'up') {
              this.detail.replies[index].ups.push(this.accesstoken)
            } else {
              this.detail.replies[index].ups.pop()
            }
          }
        })
        .catch((err) => {
          this.$router.push({
            path: '/error'
          })
        })
    }
  },
  watch: {
    $route() {
      this.fetch()
    }
  },
  created() {
    this.fetch()
  }
}
</script>
