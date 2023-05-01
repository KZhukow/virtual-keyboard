export default class SegmentedControl {
  constructor(initKey, leftLabel, leftKey, rightLabel, rightKey, action) {
    this.segmentsData = {
      [leftKey]: {
        label: leftLabel,
        position: 'left',
        reverseKey: rightKey,
      },
      [rightKey]: {
        label: rightLabel,
        position: 'right',
        reverseKey: leftKey,
      },
    };
    this.action = action;
    this.activeKey = initKey;
    this.indicatorPosition = this.segmentsData[this.activeKey].position;
    this.btnIndicator = null;
    this.element = this.createElement(leftLabel, rightLabel);
  }

  setActiveKey(value) {
    this.activeKey = value;
  }

  changeBtnState(value) {
    this.setActiveKey(value);
    this.indicatorPosition = this.segmentsData[this.activeKey].position;
    this.btnIndicator.setAttribute('name', this.indicatorPosition);
  }

  createElement(leftLabel, rightLabel) {
    const container = document.createElement('div');
    container.className = 'switchedBtn';
    container.insertAdjacentHTML('afterbegin', `
      <div class="switchedBtnIndicator" name="${this.indicatorPosition}"></div>
      <div class="switchedBtnSection">${leftLabel}</div>
      <div class="switchedBtnSection">${rightLabel}</div>
    `);
    this.btnIndicator = container.querySelector('.switchedBtnIndicator');
    container.addEventListener('click', () => {
      this.changeBtnState(this.segmentsData[this.activeKey].reverseKey);
      this.action();
    });
    return container;
  }

  getElement() {
    return this.element;
  }
}
