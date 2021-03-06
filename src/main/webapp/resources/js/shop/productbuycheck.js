$(function() {
	//如果需要在搜索框中输入商品名的话，那么就使用productName变量来进行接收
	var productName = '';
	getProductSellDailyList();
	getList();
	function getList() {
		//获取用户购买信息的URL
		var listUrl = '/campusShop/shopadmin/listuserproductmapsbyshop?pageIndex=1&pageSize=9999&productName=' + productName;
		//访问后台，获取该店铺的购买信息列表
		$.getJSON(listUrl, function(data) {
			if (data.success) {
				var userProductMapList = data.userProductMapList;
				var tempHtml = '';
				//遍历购买信息列表，拼接出列信息
				userProductMapList.map(function(item, index) {
					tempHtml += ''
						+ '<div class="row row-productbuycheck">'
						+ '<div class="col-10">' + item.product.productName + '</div>'
						+ '<div class="col-40 productbuycheck-time">' + new Date(item.createTime).Format("yyyy-MM-dd hh:mm:ss") + '</div>'
						+ '<div class="col-20">' + item.user.name + '</div>'
						+ '<div class="col-10">' + item.point + '</div>'
						+ '<div class="col-20">' + item.operator.name + '</div>'
						+ '</div>';
				});
				$('.productbuycheck-wrap').html(tempHtml);
			}
		});
	}

	$('#search').on('change', function(e) {
		//当在搜索框里输入信息的时候
		//依据输入的商品名模糊查询该商品购买记录
		productName = e.target.value;
		$('.productbuycheck-wrap').empty();
		//再次加载
		getList();
	});

	/**
	 * function:获取7天的销量
	 */
	function getProductSellDailyList() {
		//获取该店铺商品7天销量的URL
		var listProductSellDailyUrl = '/campusShop/shopadmin/listproductselldailyinfobyshop';
		//访问后台
		$.getJSON(listProductSellDailyUrl, function(data) {
			if (data.success) {
				var myChart = echarts.init(document.getElementById('chart'));
				//生成静态的Echart信息的部分
				var option = generateStaticEchartPart();
				//遍历销量统计列表，动态设定echarts的值
				option.legend.data = data.legendData;
				option.xAxis = data.xAxis;
				option.series = data.series;
				myChart.setOption(option);
			}
		});
	}

	/**
	 * function:生成静态的Echart信息的部分
	 */
	function generateStaticEchartPart() {
		/** echarts逻辑部分 **/
		var option = {
			//提示框，鼠标悬浮交互时的信息提示
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'（鼠标移动到轴的时候，显示阴影）
				}
			},
			//图例，每个图表最多仅有一个图例
			legend : {},
			//直角坐标系内绘图网格
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			//直角坐标系中横轴数组，数组中每一项代表一条横轴坐标轴
			xAxis : [ {
			} ],
			//直角坐标系中纵轴数组，数组中每一项代表一条纵轴坐标轴
			yAxis : [
				{
					type : 'value'
				}
			],
		};
		return option;
	}







//	/** echarts逻辑部分（例子）-- 以下都是静态信息 **/
//	var myChart = echarts.init(document.getElementById('chart'));
//
//	var option = {
//		//提示框，鼠标悬浮交互时的信息提示
//		tooltip : {
//			trigger : 'axis',
//			axisPointer : { // 坐标轴指示器，坐标轴触发有效
//				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'（鼠标移动到轴的时候，显示阴影）
//			}
//		},
//		//图例，每个图表最多仅有一个图例
//		legend : {
//			//图例内容数组，数组项通常为(string)，每一项代表一个系列的name
//			data : [ '茉香奶茶', '绿茶拿铁', '冰雪奇缘' ]
//		},
//		//直角坐标系内绘图网格
//		grid : {
//			left : '3%',
//			right : '4%',
//			bottom : '3%',
//			containLabel : true
//		},
//		//直角坐标系中横轴数组，数组中每一项代表一条横轴坐标轴
//		xAxis : [
//			{
//				//类目型：需要指定类目列表，坐标轴内有且仅有这些指定类目坐标
//				type : 'category',
//				data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
//			}
//		],
//		//直角坐标系中纵轴数组，数组中每一项代表一条纵轴坐标轴
//		yAxis : [
//			{
//				type : 'value'
//			}
//		],
//		//驱动图表生成的数据内容数组，数组中每一项为一个系列的选项以及数据
//		series : [
//			{
//				name : '茉香奶茶',
//				type : 'bar',
//				data : [ 120, 132, 101, 134, 290, 230, 220 ]
//			},
//			{
//				name : '绿茶拿铁',
//				type : 'bar',
//				data : [ 60, 72, 71, 74, 190, 130, 110 ]
//			},
//			{
//				name : '冰雪奇缘',
//				type : 'bar',
//				data : [ 62, 82, 91, 84, 109, 110, 120 ]
//			}
//		]
//	};
//
//	myChart.setOption(option);
});