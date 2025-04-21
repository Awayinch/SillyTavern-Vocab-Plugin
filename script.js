class VocabPlugin {
    constructor() {
        this.vocabList = new Set();
        this.autoClear = true;
        this.loadSettings();
        this.initUI();
        this.loadVocabList();

        window.addEventListener('beforeunload', () => {
            if (this.autoClear) {
                this.vocabList.clear();
                this.saveVocabList();
            }
        });
    }

    initUI() {
        // 创建悬浮按钮
        this.exportBtn = document.createElement('button');
        this.exportBtn.className = 'vocab-btn';
        this.exportBtn.innerHTML = '<i class="fa fa-book"></i> 生词本';
        Object.assign(this.exportBtn.style, {
            position: 'fixed',
            bottom: '60px',
            right: '20px',
            zIndex: 99999,
            padding: '8px 12px',
            borderRadius: '15px',
            background: 'var(--BgColorBrand)',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        });
        document.body.appendChild(this.exportBtn);

        // 事件绑定
        this.exportBtn.addEventListener('click', () => this.exportVocab());
        
        // 文本选择监听
        document.addEventListener('mouseup', (e) => {
            if (e.target.tagName === 'TEXTAREA') return;
            const selection = window.getSelection().toString().trim();
            if (selection.length > 1) this.addWord(selection);
        });
    }

    // 其他方法保持不变...
    addWord(word) { /* 同之前实现 */ }
    exportVocab() { /* 同之前实现 */ }
    // ...
}

// 注入样式
const style = document.createElement('style');
style.textContent = `
.vocab-btn:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
}`;
document.head.appendChild(style);

// 初始化插件
new VocabPlugin();
