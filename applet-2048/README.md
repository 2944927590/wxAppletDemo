### 2048 微信小程序


#### 总体思路:

>把其他方向上的滑动都转化成向左（可以是任意方向）滑动。
合并步骤是：
1.数字靠左  
2.相邻相同数字相加  
3.数字再次靠左
合并完成之后，再还原成实际方向的数据


#### 举例：

向右滑动：

|起始数据|转化成向左滑动|数字靠左|相同数据加和|数字再靠左|还原 
|:--------|:--------|:--------|:--------|:--------|:--------|
|0002|2000|2000|2000|2000|0002|
|0202|2020|2200|4000|4000|0004|
|2244|4422|4422|8040|8400|0048|
|4400|0044|4400|8000|8000|0008|


-------------------

向上滑动：
|起始数据|转化成向左滑动|数字靠左|相同数据加和|数字再靠左|还原 
|:--------|:--------|:--------|:--------|:--------|:--------|
|0002|0024|2400|2400|2400|2444|
|0202|0224|2240|4040|4400|4404|
|2244|0040|4000|4000|4000|0000|
|4400|2240|2240|4040|4400|0000|
