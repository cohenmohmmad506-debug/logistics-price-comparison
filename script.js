// ============================================
// 大大物流比价助手 v3.0 - 全自动目的地版
// 12年物流经验 + AI辅助开发
// ============================================

// ---------- 1. 物流公司数据库（核心）----------
const companies = [
    // ----- 全国性网络 -----
    {
        id: 'sf', name: '顺丰速运', color: '#2ecc71',
        advantage: '速度快，服务好', disadvantage: '价格高',
        urgencyMultiplier: { "标准": 1, "加急": 1.5, "特急": 2 },
        regions: [
            { region: "成都", basePrice: 12, perKg: 2 },
            { region: "四川", basePrice: 12, perKg: 2 },
            { region: "厦门", basePrice: 15, perKg: 3 },
            { region: "苏州", basePrice: 15, perKg: 3 },
            { region: "昆山", basePrice: 15, perKg: 3 },
            { region: "湖北", basePrice: 18, perKg: 4 },
            { region: "武汉", basePrice: 18, perKg: 4 },
            { region: "新疆", basePrice: 25, perKg: 6 },
            { region: "上海", basePrice: 15, perKg: 3 },
            { region: "北京", basePrice: 18, perKg: 4 },
            { region: "广州", basePrice: 16, perKg: 3.5 }
        ],
        timeliness: { "标准": "1-2天", "加急": "次日达", "特急": "当日达" }
    },
    {
        id: 'yt', name: '圆通速递', color: '#e74c3c',
        advantage: '价格实惠', disadvantage: '速度一般',
        urgencyMultiplier: { "标准": 1, "加急": 1.3, "特急": 1.8 },
        regions: [
            { region: "成都", basePrice: 8, perKg: 1 },
            { region: "四川", basePrice: 8, perKg: 1 },
            { region: "厦门", basePrice: 10, perKg: 1.5 },
            { region: "苏州", basePrice: 10, perKg: 1.5 },
            { region: "昆山", basePrice: 10, perKg: 1.5 },
            { region: "湖北", basePrice: 12, perKg: 2 },
            { region: "武汉", basePrice: 12, perKg: 2 },
            { region: "上海", basePrice: 10, perKg: 1.5 },
            { region: "北京", basePrice: 12, perKg: 2 },
            { region: "广州", basePrice: 11, perKg: 1.8 }
        ],
        timeliness: { "标准": "3-4天", "加急": "2-3天", "特急": "1-2天" }
    },
    {
        id: 'zt', name: '中通快递', color: '#3498db',
        advantage: '性价比高', disadvantage: '网点覆盖一般',
        urgencyMultiplier: { "标准": 1, "加急": 1.2, "特急": 1.6 },
        regions: [
            { region: "成都", basePrice: 7, perKg: 1 },
            { region: "四川", basePrice: 7, perKg: 1 },
            { region: "厦门", basePrice: 9, perKg: 1.2 },
            { region: "苏州", basePrice: 9, perKg: 1.2 },
            { region: "昆山", basePrice: 9, perKg: 1.2 },
            { region: "湖北", basePrice: 11, perKg: 1.8 },
            { region: "武汉", basePrice: 11, perKg: 1.8 },
            { region: "上海", basePrice: 9, perKg: 1.2 },
            { region: "北京", basePrice: 11, perKg: 1.8 }
        ],
        timeliness: { "标准": "2-3天", "加急": "1-2天", "特急": "次日达" }
    },
    {
        id: 'jd', name: '京东物流', color: '#f39c12',
        advantage: '自有物流，稳定', disadvantage: '主要服务电商',
        urgencyMultiplier: { "标准": 1, "加急": 1.4, "特急": 1.9 },
        regions: [
            { region: "成都", basePrice: 10, perKg: 1.5 },
            { region: "四川", basePrice: 10, perKg: 1.5 },
            { region: "厦门", basePrice: 13, perKg: 2 },
            { region: "苏州", basePrice: 13, perKg: 2 },
            { region: "昆山", basePrice: 13, perKg: 2 },
            { region: "湖北", basePrice: 16, perKg: 3 },
            { region: "武汉", basePrice: 16, perKg: 3 },
            { region: "上海", basePrice: 13, perKg: 2 },
            { region: "北京", basePrice: 16, perKg: 3 }
        ],
        timeliness: { "标准": "2-3天", "加急": "1-2天", "特急": "当日达" }
    },
    {
        id: 'yd', name: '韵达快递', color: '#9b59b6',
        advantage: '价格最低', disadvantage: '时效不稳定',
        urgencyMultiplier: { "标准": 1, "加急": 1.2, "特急": 1.6 },
        regions: [
            { region: "成都", basePrice: 6, perKg: 0.8 },
            { region: "四川", basePrice: 6, perKg: 0.8 },
            { region: "厦门", basePrice: 8, perKg: 1.2 },
            { region: "苏州", basePrice: 8, perKg: 1.2 },
            { region: "昆山", basePrice: 8, perKg: 1.2 },
            { region: "湖北", basePrice: 10, perKg: 1.5 }
        ],
        timeliness: { "标准": "4-5天", "加急": "3-4天", "特急": "2-3天" }
    },
    // ----- 专线公司（你提供的真实案例）-----
    {
        id: 'youen', name: '佑恩物流', color: '#1abc9c',
        advantage: '专线直达，时效稳', disadvantage: '线路单一',
        urgencyMultiplier: { "标准": 1, "加急": 1.2, "特急": 1.5 },
        regions: [
            { region: "成都(全境)", basePrice: 90, perKg: 0.8 },
            { region: "四川", basePrice: 95, perKg: 0.9 }
        ],
        timeliness: { "标准": "2-3天", "加急": "1-2天", "特急": "次日达" }
    },
    {
        id: 'lulutong', name: '路路通物流', color: '#1abc9c',
        advantage: '专线直达，时效稳', disadvantage: '线路单一',
        urgencyMultiplier: { "标准": 1, "加急": 1.2, "特急": 1.5 },
        regions: [
            { region: "安徽(全境)", basePrice: 10, perKg: 0.8 },
            { region: "四川", basePrice: 95, perKg: 0.9 }
        ],
        timeliness: { "标准": "2-3天", "加急": "1-2天", "特急": "次日达" }
    },
    {
        id: 'guangyuda', name: '广宇达物流', color: '#1abc9c',
        advantage: '专线直达，时效稳', disadvantage: '线路单一',
        urgencyMultiplier: { "标准": 1, "加急": 1.2, "特急": 1.5 },
        regions: [
            { region: "安徽(全境)", basePrice: 10, perKg: 0.8 },
            { region: "四川(全境）", basePrice: 111, perKg: 0.8 }
        ],
        timeliness: { "标准": "2-3天", "加急": "1-2天", "特急": "次日达" }
    },
    {
        id: 'tianzhou', name: '天洲物流', color: '#e67e22',
        advantage: '成都专线，天天发车', disadvantage: '只到成都',
        urgencyMultiplier: { "标准": 1, "加急": 1.2, "特急": 1.5 },
        regions: [
            { region: "成都", basePrice: 85, perKg: 0.7 }
        ],
        timeliness: { "标准": "2-3天", "加急": "1-2天", "特急": "次日达" }
    }
];

// ---------- 2. 自动生成目的地下拉菜单 ----------
function populateDestinationDropdown() {
    const select = document.getElementById('destination');
    if (!select) return;

    const allDestinations = new Set();
    companies.forEach(company => {
        company.regions.forEach(region => {
            allDestinations.add(region.region);
        });
    });

    const sortedDestinations = Array.from(allDestinations).sort((a, b) => a.localeCompare(b, 'zh-CN'));

    select.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- 请选择目的地 --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    sortedDestinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest;
        option.textContent = dest;
        select.appendChild(option);
    });

    console.log(`✅ 已自动生成 ${sortedDestinations.length} 个目的地选项`);
}

// ---------- 3. 筛选公司（根据目的地）----------
function filterCompaniesByDestination(destination) {
    if (!destination) return [];
    return companies.filter(company =>
        company.regions.some(r => r.region === destination)
    );
}

// ---------- 4. 计算价格 ----------
function calculatePrice(company, destination, weight, urgency) {
    const regionData = company.regions.find(r => r.region === destination);
    if (!regionData) return null;
    const base = regionData.basePrice;
    const perKg = regionData.perKg;
    const multiplier = company.urgencyMultiplier[urgency] || 1;
    let total = base + (perKg * weight);
    total = total * multiplier;
    return Math.round(total * 100) / 100;
}

// ---------- 5. 渲染汇总信息 ----------
function displaySummary(results, destination) {
    if (results.length === 0) {
        document.getElementById('summary').style.display = 'none';
        return;
    }
    const prices = results.map(r => r.price);
    const cheapest = results[0];
    const average = prices.reduce((a, b) => a + b, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    document.getElementById('recommended').innerHTML =
        `${cheapest.company.name} <span style="color: #2ecc71;">(¥${cheapest.price.toFixed(2)})</span>`;
    document.getElementById('average-price').textContent = `¥${average.toFixed(2)}`;
    document.getElementById('price-range').textContent = `¥${minPrice.toFixed(2)} - ¥${maxPrice.toFixed(2)}`;
    document.getElementById('summary').style.display = 'block';

    const summaryTitle = document.querySelector('#summary h3');
    if (summaryTitle) {
        summaryTitle.innerHTML = `<i class="fas fa-file-invoice-dollar"></i> 「${destination}」运费汇总`;
    }
}

// ---------- 6. 核心：比价按钮逻辑 ----------
document.getElementById('calculate-btn').addEventListener('click', function () {
    const destination = document.getElementById('destination').value;
    const weight = parseFloat(document.getElementById('weight').value) || 1;
    const urgency = document.getElementById('urgency').value;

    if (!destination) {
        alert('请选择目的地');
        return;
    }

    const availableCompanies = filterCompaniesByDestination(destination);
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (availableCompanies.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-truck"></i>
                <p>暂无物流公司可送达「${destination}」</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">数据持续更新中，敬请期待</p>
            </div>
        `;
        document.getElementById('summary').style.display = 'none';
        return;
    }

    const results = availableCompanies.map(company => {
        const price = calculatePrice(company, destination, weight, urgency);
        return { company, price };
    }).filter(item => item.price !== null);

    results.sort((a, b) => a.price - b.price);

    results.forEach(item => {
        const company = item.company;
        const price = item.price;
        const regionData = company.regions.find(r => r.region === destination);
        const card = document.createElement('div');
        card.className = 'company-card';
        card.style.borderLeftColor = company.color;
        card.innerHTML = `
            <div class="company-header">
                <div class="company-name"><i class="fas fa-truck"></i> ${company.name}</div>
                <div class="price">¥${price.toFixed(2)}</div>
            </div>
            <div class="company-details">
                <div><i class="fas fa-bolt"></i> 优势：${company.advantage}</div>
                <div><i class="fas fa-exclamation-triangle"></i> 劣势：${company.disadvantage}</div>
                <div><i class="fas fa-clock"></i> ${urgency}时效：${company.timeliness[urgency] || '请咨询'}</div>
                <div><i class="fas fa-map-pin"></i> 目的地：${destination}</div>
                <div><i class="fas fa-weight-hanging"></i> 计费：首重${regionData.basePrice}元 + 续重${regionData.perKg}元/kg</div>
            </div>
        `;
        resultsContainer.appendChild(card);
    });

    displaySummary(results, destination);
});

// ---------- 7. 页面初始化 ----------
document.addEventListener('DOMContentLoaded', function () {
    // 滑块与数字输入联动
    const weightSlider = document.getElementById('weight-slider');
    const weightInput = document.getElementById('weight');
    if (weightSlider && weightInput) {
        weightSlider.addEventListener('input', function (e) {
            weightInput.value = e.target.value;
        });
        weightInput.addEventListener('input', function (e) {
            weightSlider.value = e.target.value;
        });
    }

    // 自动生成目的地菜单
    populateDestinationDropdown();
});