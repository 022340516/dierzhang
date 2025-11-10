// 数据可视化平台 - 10类图表实现
class DataVisualizationPlatform {
    constructor() {
        this.currentChart = null;
        this.currentChartType = 'line';
        this.chartInstances = {};
        this.chartData = {};
        this.currentTheme = 'light';
        this.isRealTime = false;
        this.realTimeIntervals = {};
        
        this.init();
    }

    init() {
        this.generateChartData();
        this.setupEventListeners();
        this.setupCharts();
        this.hideLoading();
    }

    // 生成10类图表数据
    generateChartData() {
        // ① 折线图数据 - 未来15天气温
        this.chartData.line = {
            title: '未来15天气温趋势',
            description: '展示未来15天的气温变化趋势，包含最高温和最低温的比较。',
            xAxis: Array.from({length: 15}, (_, i) => `第${i+1}天`),
            series: [
                {
                    name: '最高温度',
                    type: 'line',
                    data: Array.from({length: 15}, () => Math.floor(Math.random() * 15) + 20),
                    smooth: true
                },
                {
                    name: '最低温度',
                    type: 'line',
                    data: Array.from({length: 15}, () => Math.floor(Math.random() * 10) + 10),
                    smooth: true
                }
            ]
        };

        // ② 柱形图数据 - 淘宝天猫GMV
        this.chartData.bar = {
            title: '淘宝天猫GMV数据',
            description: '展示各季度淘宝天猫平台的GMV数据，包含误差棒分析。',
            xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
            series: [
                {
                    name: 'GMV',
                    type: 'bar',
                    data: [1200, 1800, 1500, 2100],
                    errorData: [100, 150, 120, 180]
                }
            ]
        };

        // ③ 条形图数据 - 商品网购替代率
        this.chartData['bar-stack'] = {
            title: '商品网购替代率',
            description: '展示各类商品的网购替代率，采用堆积条形图展示。',
            yAxis: ['服装', '电子产品', '日用品', '食品', '图书'],
            series: [
                {
                    name: '线上购买',
                    type: 'bar',
                    data: [65, 80, 45, 30, 70],
                    stack: 'total'
                },
                {
                    name: '线下购买',
                    type: 'bar',
                    data: [35, 20, 55, 70, 30],
                    stack: 'total'
                }
            ]
        };

        // ④ 堆积面积图数据 - 物流公司物流费用
        this.chartData.area = {
            title: '物流公司费用分布',
            description: '展示不同物流公司的费用堆积分布情况。',
            xAxis: ['顺丰', '中通', '圆通', '申通', '韵达'],
            series: [
                {
                    name: '运输费',
                    type: 'line',
                    stack: 'total',
                    areaStyle: {},
                    data: [15, 8, 7, 6, 5]
                },
                {
                    name: '仓储费',
                    type: 'line',
                    stack: 'total',
                    areaStyle: {},
                    data: [5, 3, 2, 2, 2]
                },
                {
                    name: '其他费用',
                    type: 'line',
                    stack: 'total',
                    areaStyle: {},
                    data: [3, 2, 1, 1, 1]
                }
            ]
        };

        // ⑤ 直方图数据 - 人脸识别灰度值
        this.chartData.histogram = {
            title: '人脸识别灰度值分布',
            description: '展示人脸识别图像中灰度值的分布情况。',
            data: Array.from({length: 100}, () => Math.floor(Math.random() * 256)),
            bins: 20
        };

        // ⑥ 饼图/圆环图数据 - 支付宝月账单
        this.chartData.pie = {
            title: '支付宝月账单分布',
            description: '展示支付宝月度账单的各项支出比例。',
            data: [
                { name: '餐饮美食', value: 1200 },
                { name: '交通出行', value: 800 },
                { name: '购物消费', value: 2500 },
                { name: '生活缴费', value: 300 },
                { name: '其他支出', value: 200 }
            ]
        };

        // ⑦ 散点图/气泡图数据 - 汽车速度与制动距离
        this.chartData.scatter = {
            title: '汽车速度与制动距离关系',
            description: '展示不同速度下汽车的制动距离分布。',
            data: Array.from({length: 50}, () => ({
                value: [Math.random() * 120 + 30, Math.random() * 50 + 10],
                symbolSize: Math.random() * 20 + 5
            }))
        };

        // ⑧ 箱形图数据 - 2017-2018全国发电量
        this.chartData.box = {
            title: '2017-2018全国发电量统计',
            description: '展示各地区发电量的箱形图统计分布。',
            xAxis: ['华北', '华东', '华南', '华中', '西北', '西南', '东北'],
            data: [
                [850, 920, 780, 950, 870],
                [1200, 1150, 1250, 1180, 1220],
                [950, 880, 920, 970, 900],
                [680, 720, 650, 700, 690],
                [550, 580, 520, 600, 570],
                [480, 520, 450, 500, 490],
                [720, 680, 750, 710, 690]
            ]
        };

        // ⑨ 雷达图数据 - 霍兰德职业兴趣测试
        this.chartData.radar = {
            title: '霍兰德职业兴趣测试结果',
            description: '展示个人职业兴趣的六个维度评估结果。',
            indicators: [
                { name: '现实型(R)', max: 100 },
                { name: '研究型(I)', max: 100 },
                { name: '艺术型(A)', max: 100 },
                { name: '社会型(S)', max: 100 },
                { name: '企业型(E)', max: 100 },
                { name: '常规型(C)', max: 100 }
            ],
            data: [85, 70, 60, 90, 75, 65]
        };

        // ⑩ 误差棒图数据 - 4个树种细根生物量
        this.chartData['error-bar'] = {
            title: '树种细根生物量比较',
            description: '展示不同树种细根生物量的平均值和误差范围。',
            xAxis: ['橡树', '松树', '枫树', '桦树'],
            data: [
                { value: 45, error: 8 },
                { value: 38, error: 6 },
                { value: 52, error: 9 },
                { value: 41, error: 7 }
            ]
        };
    }

    // 设置事件监听器
    setupEventListeners() {
        // 图表选择器
        document.getElementById('chartSelector').addEventListener('change', (e) => {
            this.switchChart(e.target.value);
        });

        // 视图切换
        document.getElementById('singleView').addEventListener('click', () => {
            this.switchView('single');
        });
        document.getElementById('multiView').addEventListener('click', () => {
            this.switchView('multi');
        });

        // 主题切换
        document.getElementById('themeLight').addEventListener('click', () => {
            this.switchTheme('light');
        });
        document.getElementById('themeDark').addEventListener('click', () => {
            this.switchTheme('dark');
        });
        document.getElementById('themeBlue').addEventListener('click', () => {
            this.switchTheme('blue');
        });
        document.getElementById('themeGreen').addEventListener('click', () => {
            this.switchTheme('green');
        });
        document.getElementById('themePurple').addEventListener('click', () => {
            this.switchTheme('purple');
        });

        // 控制面板按钮
        document.getElementById('downloadCSV').addEventListener('click', () => {
            this.downloadCSV();
        });
        document.getElementById('editData').addEventListener('click', () => {
            this.openDataEditor();
        });
        document.getElementById('realTime').addEventListener('click', () => {
            this.toggleRealTime();
        });
        document.getElementById('zoomReset').addEventListener('click', () => {
            this.resetZoom();
        });

        // 数据间距调整
        document.getElementById('dataSpacing').addEventListener('input', (e) => {
            this.adjustDataSpacing(e.target.value);
        });

        // 模态框控制
        document.getElementById('modalCancel').addEventListener('click', () => {
            this.closeModal();
        });
        document.getElementById('modalSave').addEventListener('click', () => {
            this.saveModalData();
        });
    }

    // 设置图表实例
    setupCharts() {
        this.currentChart = echarts.init(document.getElementById('currentChart'));
        this.renderChart('line');
    }

    // 渲染图表
    renderChart(chartType) {
        this.currentChartType = chartType;
        const data = this.chartData[chartType];
        
        if (!data) return;

        // 更新标题和描述
        document.getElementById('chartTitle').textContent = data.title;
        document.getElementById('chartDescription').textContent = data.description;

        let option;

        switch(chartType) {
            case 'line':
                option = this.getLineChartOption(data);
                break;
            case 'bar':
                option = this.getBarChartOption(data);
                break;
            case 'bar-stack':
                option = this.getStackedBarChartOption(data);
                break;
            case 'area':
                option = this.getAreaChartOption(data);
                break;
            case 'histogram':
                option = this.getHistogramOption(data);
                break;
            case 'pie':
                option = this.getPieChartOption(data);
                break;
            case 'scatter':
                option = this.getScatterChartOption(data);
                break;
            case 'box':
                option = this.getBoxChartOption(data);
                break;
            case 'radar':
                option = this.getRadarChartOption(data);
                break;
            case 'error-bar':
                option = this.getErrorBarChartOption(data);
                break;
            default:
                option = {};
        }

        this.currentChart.setOption(option, true);
        this.chartInstances[chartType] = this.currentChart;
    }

    // 折线图配置
    getLineChartOption(data) {
        return {
            animation: true,
            animationDuration: 1000,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            legend: {
                data: data.series.map(s => s.name)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.xAxis
            },
            yAxis: {
                type: 'value',
                name: '温度(°C)'
            },
            series: data.series
        };
    }

    // 柱形图配置（带误差棒）
    getBarChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            xAxis: {
                type: 'category',
                data: data.xAxis
            },
            yAxis: {
                type: 'value',
                name: 'GMV(亿元)'
            },
            series: [{
                ...data.series[0],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                }
            }]
        };
    }

    // 堆积条形图配置
    getStackedBarChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                data: data.series.map(s => s.name)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '替代率(%)'
            },
            yAxis: {
                type: 'category',
                data: data.yAxis
            },
            series: data.series
        };
    }

    // 堆积面积图配置
    getAreaChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            legend: {
                data: data.series.map(s => s.name)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.xAxis
            },
            yAxis: {
                type: 'value',
                name: '费用(元/kg)'
            },
            series: data.series
        };
    }

    // 直方图配置
    getHistogramOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '灰度值',
                min: 0,
                max: 255
            },
            yAxis: {
                type: 'value',
                name: '频数'
            },
            series: [{
                name: '灰度分布',
                type: 'bar',
                data: this.calculateHistogram(data.data, data.bins),
                barWidth: '99%'
            }]
        };
    }

    // 饼图/圆环图配置
    getPieChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}元 ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [{
                name: '支出分布',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data.data
            }]
        };
    }

    // 散点图/气泡图配置
    getScatterChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'item',
                formatter: '速度: {c[0]} km/h<br>制动距离: {c[1]} m'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '速度(km/h)',
                scale: true
            },
            yAxis: {
                type: 'value',
                name: '制动距离(m)',
                scale: true
            },
            series: [{
                name: '速度-制动距离',
                type: 'scatter',
                symbolSize: (data) => data[2] || 10,
                data: data.data,
                markLine: {
                    lineStyle: {
                        type: 'dashed'
                    },
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }]
        };
    }

    // 箱形图配置
    getBoxChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'item',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                boundaryGap: true,
                nameGap: 30
            },
            yAxis: {
                type: 'value',
                name: '发电量(亿千瓦时)',
                scale: true
            },
            series: [{
                name: '发电量',
                type: 'boxplot',
                data: data.data.map(arr => this.calculateBoxplotData(arr))
            }]
        };
    }

    // 雷达图配置
    getRadarChartOption(data) {
        return {
            animation: true,
            tooltip: {},
            radar: {
                indicator: data.indicators,
                shape: 'polygon'
            },
            series: [{
                name: '职业兴趣',
                type: 'radar',
                data: [{
                    value: data.data,
                    name: '测评结果',
                    areaStyle: {}
                }]
            }]
        };
    }

    // 误差棒图配置
    getErrorBarChartOption(data) {
        return {
            animation: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            xAxis: {
                type: 'category',
                data: data.xAxis
            },
            yAxis: {
                type: 'value',
                name: '生物量(g/m²)'
            },
            series: [{
                name: '平均值',
                type: 'bar',
                data: data.data.map(item => item.value),
                markPoint: {
                    data: data.data.map((item, index) => ({
                        name: '误差范围',
                        value: item.error,
                        xAxis: index,
                        yAxis: item.value
                    }))
                }
            }]
        };
    }

    // 辅助函数：计算直方图数据
    calculateHistogram(data, bins) {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binWidth = (max - min) / bins;
        
        const histogram = Array(bins).fill(0);
        data.forEach(value => {
            const binIndex = Math.floor((value - min) / binWidth);
            histogram[Math.min(binIndex, bins - 1)]++;
        });
        
        return histogram.map((count, i) => ({
            value: count,
            name: `${Math.round(min + i * binWidth)}-${Math.round(min + (i + 1) * binWidth)}`
        }));
    }

    // 辅助函数：计算箱形图数据
    calculateBoxplotData(arr) {
        const sorted = [...arr].sort((a, b) => a - b);
        const q1 = this.quantile(sorted, 0.25);
        const median = this.quantile(sorted, 0.5);
        const q3 = this.quantile(sorted, 0.75);
        const iqr = q3 - q1;
        
        return [
            Math.max(sorted[0], q1 - 1.5 * iqr), // 下边界
            q1,
            median,
            q3,
            Math.min(sorted[sorted.length - 1], q3 + 1.5 * iqr) // 上边界
        ];
    }

    // 辅助函数：计算分位数
    quantile(sorted, p) {
        const pos = (sorted.length - 1) * p;
        const base = Math.floor(pos);
        const rest = pos - base;
        
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    }

    // 切换图表
    switchChart(chartType) {
        this.renderChart(chartType);
    }

    // 切换视图
    switchView(viewType) {
        const singleView = document.getElementById('singleChartView');
        const multiView = document.getElementById('multiChartView');
        const singleBtn = document.getElementById('singleView');
        const multiBtn = document.getElementById('multiView');

        if (viewType === 'single') {
            singleView.classList.remove('hidden');
            multiView.classList.add('hidden');
            singleBtn.classList.add('bg-blue-600', 'text-white');
            singleBtn.classList.remove('bg-gray-200', 'text-gray-700');
            multiBtn.classList.remove('bg-blue-600', 'text-white');
            multiBtn.classList.add('bg-gray-200', 'text-gray-700');
        } else {
            singleView.classList.add('hidden');
            multiView.classList.remove('hidden');
            multiBtn.classList.add('bg-blue-600', 'text-white');
            multiBtn.classList.remove('bg-gray-200', 'text-gray-700');
            singleBtn.classList.remove('bg-blue-600', 'text-white');
            singleBtn.classList.add('bg-gray-200', 'text-gray-700');
            this.renderMultiCharts();
        }
    }

    // 渲染多图表视图
    renderMultiCharts() {
        const multiView = document.getElementById('multiChartView');
        multiView.innerHTML = '';

        Object.keys(this.chartData).forEach((chartType, index) => {
            const chartCard = document.createElement('div');
            chartCard.className = 'chart-card p-4';
            
            chartCard.innerHTML = `
                <h3 class="text-lg font-semibold mb-2">${this.chartData[chartType].title}</h3>
                <div id="multiChart-${chartType}" class="h-64"></div>
            `;
            
            multiView.appendChild(chartCard);

            // 延迟渲染图表以避免性能问题
            setTimeout(() => {
                const chart = echarts.init(document.getElementById(`multiChart-${chartType}`));
                this.renderChartToInstance(chart, chartType);
            }, index * 100);
        });
    }

    // 渲染图表到指定实例
    renderChartToInstance(chartInstance, chartType) {
        const data = this.chartData[chartType];
        if (!data) return;

        let option;
        switch(chartType) {
            case 'line': option = this.getLineChartOption(data); break;
            case 'bar': option = this.getBarChartOption(data); break;
            case 'bar-stack': option = this.getStackedBarChartOption(data); break;
            case 'area': option = this.getAreaChartOption(data); break;
            case 'histogram': option = this.getHistogramOption(data); break;
            case 'pie': option = this.getPieChartOption(data); break;
            case 'scatter': option = this.getScatterChartOption(data); break;
            case 'box': option = this.getBoxChartOption(data); break;
            case 'radar': option = this.getRadarChartOption(data); break;
            case 'error-bar': option = this.getErrorBarChartOption(data); break;
            default: option = {};
        }

        chartInstance.setOption(option, true);
        this.chartInstances[`multi-${chartType}`] = chartInstance;
    }

    // 切换主题
    switchTheme(theme) {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        
        if (theme === 'dark') {
            document.body.classList.add('dark');
        }
        
        this.currentTheme = theme;
        
        // 重新渲染所有图表以适应新主题
        Object.keys(this.chartInstances).forEach(key => {
            if (this.chartInstances[key]) {
                this.chartInstances[key].dispose();
            }
        });
        
        this.chartInstances = {};
        this.setupCharts();
        
        if (document.getElementById('multiChartView').classList.contains('hidden')) {
            this.switchView('multi');
        }
    }

    // 下载CSV
    downloadCSV() {
        const data = this.chartData[this.currentChartType];
        let csvContent = '';

        switch(this.currentChartType) {
            case 'line':
                csvContent = '日期,最高温度,最低温度\n';
                data.xAxis.forEach((date, i) => {
                    csvContent += `${date},${data.series[0].data[i]},${data.series[1].data[i]}\n`;
                });
                break;
            case 'pie':
                csvContent = '类别,金额\n';
                data.data.forEach(item => {
                    csvContent += `${item.name},${item.value}\n`;
                });
                break;
            // 其他图表类型的CSV导出逻辑...
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${data.title}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showToast('CSV文件下载成功！');
    }

    // 打开数据编辑器
    openDataEditor() {
        const modal = document.getElementById('dataModal');
        const content = document.getElementById('modalContent');
        const data = this.chartData[this.currentChartType];

        let html = '<h4 class="font-semibold mb-4">编辑图表数据</h4>';

        switch(this.currentChartType) {
            case 'line':
                html += '<div class="space-y-3">';
                data.xAxis.forEach((date, i) => {
                    html += `
                        <div class="flex items-center space-x-3">
                            <span class="w-20">${date}:</span>
                            <input type="number" value="${data.series[0].data[i]}" class="input-field w-24" data-type="max" data-index="${i}">
                            <input type="number" value="${data.series[1].data[i]}" class="input-field w-24" data-type="min" data-index="${i}">
                        </div>
                    `;
                });
                html += '</div>';
                break;
            // 其他图表类型的数据编辑界面...
        }

        content.innerHTML = html;
        modal.classList.remove('hidden');
    }

    // 关闭模态框
    closeModal() {
        document.getElementById('dataModal').classList.add('hidden');
    }

    // 保存模态框数据
    saveModalData() {
        const inputs = document.querySelectorAll('#modalContent input');
        const data = this.chartData[this.currentChartType];

        inputs.forEach(input => {
            const index = input.dataset.index;
            const type = input.dataset.type;
            
            if (this.currentChartType === 'line') {
                const seriesIndex = type === 'max' ? 0 : 1;
                data.series[seriesIndex].data[index] = parseFloat(input.value);
            }
        });

        this.renderChart(this.currentChartType);
        this.closeModal();
        this.showToast('数据保存成功！');
    }

    // 切换实时更新
    toggleRealTime() {
        this.isRealTime = !this.isRealTime;
        const btn = document.getElementById('realTime');
        
        if (this.isRealTime) {
            btn.classList.add('bg-green-600');
            btn.classList.remove('bg-red-600');
            btn.textContent = '停止实时';
            this.startRealTimeUpdate();
        } else {
            btn.classList.add('bg-red-600');
            btn.classList.remove('bg-green-600');
            btn.textContent = '实时更新';
            this.stopRealTimeUpdate();
        }
    }

    // 开始实时更新
    startRealTimeUpdate() {
        this.realTimeIntervals[this.currentChartType] = setInterval(() => {
            this.updateRealTimeData();
        }, 2000);
    }

    // 停止实时更新
    stopRealTimeUpdate() {
        if (this.realTimeIntervals[this.currentChartType]) {
            clearInterval(this.realTimeIntervals[this.currentChartType]);
            delete this.realTimeIntervals[this.currentChartType];
        }
    }

    // 更新实时数据
    updateRealTimeData() {
        const data = this.chartData[this.currentChartType];
        
        if (this.currentChartType === 'line') {
            data.series[0].data = data.series[0].data.map(() => 
                Math.floor(Math.random() * 15) + 20
            );
            data.series[1].data = data.series[1].data.map(() => 
                Math.floor(Math.random() * 10) + 10
            );
        }
        
        this.renderChart(this.currentChartType);
    }

    // 重置缩放
    resetZoom() {
        if (this.currentChart) {
            this.currentChart.dispatchAction({
                type: 'dataZoom',
                start: 0,
                end: 100
            });
        }
    }

    // 调整数据间距
    adjustDataSpacing(spacing) {
        // 实现数据间距调整逻辑
        console.log('调整数据间距:', spacing);
    }

    // 显示提示消息
    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('translate-x-full');
        
        setTimeout(() => {
            toast.classList.add('translate-x-full');
        }, 3000);
    }

    // 隐藏加载动画
    hideLoading() {
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
        }, 1000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new DataVisualizationPlatform();
});