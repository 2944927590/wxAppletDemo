import Board from './board';
import Main from './main';

Page({ 
  data: {
    hidden: false,
    start: "开始游戏",
    num: [],
    score: 0,
    bestScore: 0, // 最高分
    endMsg: '',
    over: false,  // 游戏是否结束 
    animationData: {}
  },
  // 页面渲染完成
  onReady () {
    if(!wx.getStorageSync("highScore"))
      wx.setStorageSync('highScore', 0);
    this.gameStart();
  },
  gameStart() {  // 游戏开始
    const main = new Main(4);
    this.setData({
      main: main,
      bestScore: wx.getStorageSync('highScore')
    });

    this.setData({
      hidden: true,
      over: false,
      score: 0,
      num: this.data.main.board.grid
    });
  },
  gameOver() {  // 游戏结束
    this.setData({
      over: true 
    });
  
    if (this.data.score >= 2048) {
      this.setData({ 
        endMsg: '恭喜达到2048！'
      });
      wx.setStorageSync('highScore', this.data.score);
    } else if (this.data.score > this.data.bestScore) {
      this.setData({
        endMsg: '创造新纪录！' 
      }); 
      wx.setStorageSync('highScore', this.data.score);
    } else {
      this.setData({
        endMsg: '游戏结束！'
      }); 
    } 
  },
  // 触摸
  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,
  touchStart(ev) { // 触摸开始坐标
    const touch = ev.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  },
  touchMove(ev) { // 触摸最后移动时的坐标
    
  },
  touchEnd(ev) {
    console.log(ev);
    const touch = ev.changedTouches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;

    const disX = this.touchStartX - this.touchEndX;
    const absdisX = Math.abs(disX);
    const disY = this.touchStartY - this.touchEndY;
    const absdisY = Math.abs(disY);

    console.log({
      touchStartX: this.touchStartX,
      touchStartY: this.touchStartY,
      touchEndX: this.touchEndX,
      touchEndY: this.touchEndY,
    })

    if (this.touchEndX === 0 && this.touchEndY === 0) {
      return false;
    }

    if(this.data.main.isOver()) { // 游戏是否结束
      this.gameOver();
    } else {
      if (Math.max(absdisX, absdisY) > 50) { // 确定是否在滑动
        this.setData({
          start: "重新开始",
        });
        // 0:上, 1:右, 2:下, 3:左
        const direction = absdisX > absdisY ? (disX < 0 ? 1 : 3) : (disY < 0 ? 2 : 0);  // 确定移动方向 0:上, 1:右, 2:下, 3:左
        const data = this.data.main.move(direction);
        this.updateView(data);
      }
    }      
  },
  updateView(data) {
    let max = 0;
    for(let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
        if(data[i][j] != "" && data[i][j] > max)
          max = data[i][j];
    this.setData({
      num: data,
      score: max
    });
  },
  onShareAppMessage() {
    return {
      title: '2048小游戏',
      desc: '来试试你能达到多少分',
      path: ''
    }
  }
})