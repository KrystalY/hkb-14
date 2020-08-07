import Component from './Component.js';
import {
  $,
  appendChildAll,
  templateToElementNodes,
} from '../utils/document.js';
import { StoreEvent } from '../constant/Event.js';
import { formatCurrency, getLastDateOfMonth } from '../utils/helper.js';
import { CATEGORY } from '../constant/constant.js';

// eslint-disable-next-line
import style from '../stylesheet/component/DailyChart.scss';

export default class DailyChart extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'daily_chart',
    };

    super({ attribute });

    this.svgConfig = {
      width: 840,
      height: 420,
      lines: 9,
      spacing: 10,
      leftSideWidth: 100,
      bottomSideHeight: 80,
    };
    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.renderLineChart,
    };
    this.setSubscribers(subscribers);
  }

  getSVG() {
    return document.getElementById('lineChart');
  }

  createMonthData(storeData) {
    const lastDateOfMonth = getLastDateOfMonth(storeData.year, storeData.month);
    const monthData = [...Array(lastDateOfMonth).keys()].map((i) => {
      return { day: i + 1, expenditureSum: 0 };
    });

    storeData.records.forEach((record) => {
      const day = parseInt(record.record_at.slice(8, 10)) - 1;
      if (record.category.is_income === CATEGORY.EXPENDITURE) {
        monthData[day - 1].expenditureSum += record.amount;
      }
    });

    const maxValue = monthData.reduce(function (value, data) {
      return Math.max(value, data.expenditureSum);
    }, 0);
    return {
      month: storeData.month,
      lastDateOfMonth,
      maxValue,
      count: monthData.length,
      items: monthData,
    };
  }

  createStyle() {
    return `
    <style>
      @keyframes drawPath {
        to {
          stroke-dashoffset: 0;
        }
      }

      @keyframes drawPoint {
        to {
          opacity: 1;
        }
      }

      .baseline { fill: transparent; stroke: #aaa; }
      .baseline_text { font-size: 1em; fill: #7c7b8c; }
      .point {
        fill: #fff;
        stroke: #29b6ae;
        stroke-width: 2px;
        animation: drawPoint 0.6s linear forwards;
        animation-delay: 2s;
        opacity: 0;
      }

      .point_path {
        fill: transparent;
        stroke: #29b6ae;
        stroke-width: 5px;
        stroke-dasharray: 4800;
        stroke-dashoffset: 4800;
        animation: drawPath 5s ease-in-out forwards;
      }
    </style>
    `;
  }

  renderLineChart(storeData) {
    const $svg = this.getSVG();
    const monthData = this.createMonthData(storeData);
    const svg = this.svgConfig;
    const box = {
      startX: svg.leftSideWidth,
      startY: 0,
      endX: svg.width,
      endY: svg.height - svg.bottomSideHeight,
      width: svg.width - svg.leftSideWidth,
      height: svg.height - svg.bottomSideHeight,
    };
    box.lineHeight = box.height / svg.lines;
    box.circleX = box.width / monthData.count;
    box.circleStartX = box.startX + svg.spacing;
    box.valueGap = monthData.maxValue / (svg.lines - 1);

    const html = `
    ${this.createStyle()}
    ${this.drawBaseLines(svg, box)}
    ${this.drawLeftSideText(svg, box)}
    ${this.drawBottomSideText(svg, box, monthData)}
    ${this.drawDailyData(box, monthData)}
    `;

    $svg.innerHTML = html;
  }

  drawBaseLines(svg, box) {
    return [...new Array(svg.lines).keys()]
      .map((i) => {
        const lineY = box.lineHeight * (i + 1);
        return `
        <line x1="${box.startX}" y1="${lineY}" x2="${box.endX}" y2="${lineY}" class="baseline" />
        `;
      })
      .join('');
  }

  drawLeftSideText(svg, box) {
    return [...new Array(svg.lines).keys()]
      .map((i) => {
        const lineX = box.startX - svg.spacing;
        const lineY = box.lineHeight * (i + 1);
        return `
        <text text-anchor="end" x="${lineX}" y="${lineY}" class="baseline_text">${formatCurrency(
          box.valueGap * (svg.lines - i - 1),
        )}</text>
        `;
      })
      .join('');
  }

  drawBottomSideText(svg, box, data) {
    const dateList = [1, 6, 11, 16, 21, 26, data.lastDateOfMonth];
    return [...new Array(7).keys()]
      .map((i) => {
        let textX = box.circleStartX + box.circleX * i * 5;
        if (i === 6) {
          textX = box.circleStartX + box.circleX * (data.lastDateOfMonth - 1);
        }
        const textY = svg.height - svg.bottomSideHeight / 2;

        return `
        <text text-anchor="middle" x="${textX}" y="${textY}" class="baseline_text">${data.month}.${dateList[i]}</text>
        `;
      })
      .join('');
  }

  drawDailyData(box, data) {
    const pathPointData = [];
    const heightRatio = (box.height - box.lineHeight) / data.maxValue;

    const circles = data.items
      .map((item, i) => {
        const cx = box.circleStartX + box.circleX * i;
        let cy = box.height - item.expenditureSum * heightRatio;
        if (data.maxValue === 0) {
          cy = box.endY;
        }

        pathPointData.push([cx, cy]);
        return `<circle cx="${cx}" cy="${cy}" r="4" class="point" />`;
      })
      .join('');

    const pathData = pathPointData.map((point, i) => {
      let [x, y] = point;
      let command = 'L';
      if (i === 0) {
        command = 'M';
      }
      return `${command} ${x}, ${y}`;
    });

    const circlePath = `<path d="${pathData.join(' ')}" class="point_path" />`;
    return circlePath + circles;
  }

  render() {
    const svg = this.svgConfig;
    const template = `
    <div class="chart_container">
      <svg id="lineChart" version="1.1" width="${svg.width}"
      height="${svg.height}" viewBox="0 0 ${svg.width} ${svg.height}">
      </svg>
    </div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}
