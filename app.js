// PM Dashboard Application
class PMDashboard {
    constructor() {
        this.products = [];
        this.currentEditId = null;
        this.filteredProducts = [];
        
        this.init();
    }

    // Initialize the application
    init() {
        this.loadProducts();
        this.bindEvents();
        this.updateStats();
        this.renderProducts();
    }

    // Load products from localStorage (simulating data.txt)
    loadProducts() {
        try {
            const savedProducts = localStorage.getItem('pm_products');
            if (savedProducts) {
                this.products = JSON.parse(savedProducts);
            } else {
                // Initialize with sample data if no data exists
                this.products = this.getSampleData();
                this.saveProducts();
            }
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
            this.filteredProducts = [];
        }
    }

    // Save products to localStorage (simulating data.txt)
    saveProducts() {
        try {
            localStorage.setItem('pm_products', JSON.stringify(this.products));
            this.updateDataFile();
        } catch (error) {
            console.error('Error saving products:', error);
        }
    }

    // Update data.txt file content (for display purposes)
    updateDataFile() {
        const dataContent = this.products.map(product => 
            `${product.id}|${product.name}|${product.description}|${product.status}|${product.priority}|${product.owner}|${product.deadline}|${product.tags.join(',')}|${product.createdAt}|${product.updatedAt}`
        ).join('\n');
        
        // This would normally write to data.txt, but we'll use localStorage for browser compatibility
        localStorage.setItem('pm_data_txt', dataContent);
    }

    // Get sample data for initial setup
    getSampleData() {
        return [
            {
                id: this.generateId(),
                name: 'モバイルアプリ リニューアル',
                description: 'ユーザーエクスペリエンスを向上させるためのモバイルアプリケーションの全面的なリニューアルプロジェクト',
                status: 'active',
                priority: 'high',
                owner: '田中太郎',
                deadline: '2024-03-15',
                tags: ['Mobile', 'UX', 'Design'],
                createdAt: new Date('2024-01-15').toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                name: 'API統合プラットフォーム',
                description: '外部サービスとの連携を強化するためのAPI統合プラットフォームの開発',
                status: 'planning',
                priority: 'medium',
                owner: '佐藤花子',
                deadline: '2024-04-30',
                tags: ['API', 'Integration', 'Backend'],
                createdAt: new Date('2024-01-20').toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                name: 'データ分析ダッシュボード',
                description: 'ビジネスインテリジェンスのためのリアルタイムデータ分析ダッシュボード',
                status: 'completed',
                priority: 'high',
                owner: '山田次郎',
                deadline: '2024-02-28',
                tags: ['Analytics', 'Dashboard', 'BI'],
                createdAt: new Date('2023-12-01').toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Bind event listeners
    bindEvents() {
        // Add product button
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.openProductModal();
        });

        // Product form submission
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterProducts();
        });

        // Filter functionality
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterProducts();
        });

        document.getElementById('priorityFilter').addEventListener('change', () => {
            this.filterProducts();
        });

        // Delete confirmation
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.deleteProduct();
        });

        // Close modals on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAllModals();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.openProductModal();
            }
        });
    }

    // Open product modal for adding or editing
    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('productForm');

        this.currentEditId = productId;

        if (productId) {
            // Edit mode
            const product = this.products.find(p => p.id === productId);
            if (product) {
                modalTitle.textContent = 'プロダクトを編集';
                this.populateForm(product);
            }
        } else {
            // Add mode
            modalTitle.textContent = '新規プロダクト';
            form.reset();
        }

        modal.classList.add('active');
        document.getElementById('productName').focus();
    }

    // Close product modal
    closeProductModal() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('active');
        this.currentEditId = null;
        document.getElementById('productForm').reset();
    }

    // Open delete confirmation modal
    openDeleteModal(productId) {
        this.currentEditId = productId;
        document.getElementById('deleteModal').classList.add('active');
    }

    // Close delete confirmation modal
    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('active');
        this.currentEditId = null;
    }

    // Close all modals
    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        this.currentEditId = null;
    }

    // Populate form with product data
    populateForm(product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productStatus').value = product.status;
        document.getElementById('productPriority').value = product.priority;
        document.getElementById('productOwner').value = product.owner;
        document.getElementById('productDeadline').value = product.deadline;
        document.getElementById('productTags').value = product.tags.join(', ');
    }

    // Save product (add or update)
    saveProduct() {
        const formData = {
            name: document.getElementById('productName').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
            status: document.getElementById('productStatus').value,
            priority: document.getElementById('productPriority').value,
            owner: document.getElementById('productOwner').value.trim(),
            deadline: document.getElementById('productDeadline').value,
            tags: document.getElementById('productTags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
        };

        // Validation
        if (!formData.name) {
            alert('プロダクト名は必須です。');
            return;
        }

        if (this.currentEditId) {
            // Update existing product
            const productIndex = this.products.findIndex(p => p.id === this.currentEditId);
            if (productIndex !== -1) {
                this.products[productIndex] = {
                    ...this.products[productIndex],
                    ...formData,
                    updatedAt: new Date().toISOString()
                };
            }
        } else {
            // Add new product
            const newProduct = {
                id: this.generateId(),
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.products.push(newProduct);
        }

        this.saveProducts();
        this.filterProducts();
        this.updateStats();
        this.renderProducts();
        this.closeProductModal();

        // Show success message
        this.showNotification(
            this.currentEditId ? 'プロダクトが更新されました' : 'プロダクトが追加されました',
            'success'
        );
    }

    // Delete product
    deleteProduct() {
        if (this.currentEditId) {
            const productIndex = this.products.findIndex(p => p.id === this.currentEditId);
            if (productIndex !== -1) {
                const productName = this.products[productIndex].name;
                this.products.splice(productIndex, 1);
                this.saveProducts();
                this.filterProducts();
                this.updateStats();
                this.renderProducts();
                this.closeDeleteModal();

                this.showNotification(`「${productName}」が削除されました`, 'success');
            }
        }
    }

    // Filter products based on search and filters
    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;

        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.owner.toLowerCase().includes(searchTerm) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            const matchesStatus = !statusFilter || product.status === statusFilter;
            const matchesPriority = !priorityFilter || product.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });

        this.renderProducts();
    }

    // Update statistics
    updateStats() {
        const stats = {
            total: this.products.length,
            active: this.products.filter(p => p.status === 'active').length,
            planning: this.products.filter(p => p.status === 'planning').length,
            completed: this.products.filter(p => p.status === 'completed').length
        };

        document.getElementById('totalProducts').textContent = stats.total;
        document.getElementById('activeProducts').textContent = stats.active;
        document.getElementById('planningProducts').textContent = stats.planning;
        document.getElementById('completedProducts').textContent = stats.completed;
    }

    // Render products grid
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const emptyState = document.getElementById('emptyState');

        if (this.filteredProducts.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';

        grid.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
    }

    // Create product card HTML
    createProductCard(product) {
        const formattedDate = product.deadline ? 
            new Date(product.deadline).toLocaleDateString('ja-JP') : '未設定';
        
        const createdDate = new Date(product.createdAt).toLocaleDateString('ja-JP');
        
        const tagsHtml = product.tags.map(tag => 
            `<span class="tag">${this.escapeHtml(tag)}</span>`
        ).join('');

        return `
            <div class="product-card status-${product.status}">
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${this.escapeHtml(product.name)}</h3>
                    </div>
                    <div class="product-actions">
                        <button class="action-btn edit" onclick="app.openProductModal('${product.id}')" title="編集">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="app.openDeleteModal('${product.id}')" title="削除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                ${product.description ? `<p class="product-description">${this.escapeHtml(product.description)}</p>` : ''}
                
                <div class="product-meta">
                    ${product.owner ? `
                        <div class="meta-item">
                            <i class="fas fa-user"></i>
                            <span>${this.escapeHtml(product.owner)}</span>
                        </div>
                    ` : ''}
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>期限: ${formattedDate}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>作成: ${createdDate}</span>
                    </div>
                </div>
                
                ${product.tags.length > 0 ? `
                    <div class="product-tags">
                        ${tagsHtml}
                    </div>
                ` : ''}
                
                <div class="product-footer">
                    <span class="status-badge ${product.status}">${this.getStatusLabel(product.status)}</span>
                    <span class="priority-badge ${product.priority}">${this.getPriorityLabel(product.priority)}</span>
                </div>
            </div>
        `;
    }

    // Get status label in Japanese
    getStatusLabel(status) {
        const labels = {
            'planning': '企画中',
            'active': 'アクティブ',
            'completed': '完了',
            'on-hold': '保留'
        };
        return labels[status] || status;
    }

    // Get priority label in Japanese
    getPriorityLabel(priority) {
        const labels = {
            'high': '高',
            'medium': '中',
            'low': '低'
        };
        return labels[priority] || priority;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--info-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform var(--transition-normal);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Export data as JSON
    exportData() {
        const dataStr = JSON.stringify(this.products, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'pm_products.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('データがエクスポートされました', 'success');
    }

    // Import data from JSON
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedProducts = JSON.parse(e.target.result);
                if (Array.isArray(importedProducts)) {
                    this.products = importedProducts;
                    this.saveProducts();
                    this.filterProducts();
                    this.updateStats();
                    this.renderProducts();
                    this.showNotification('データがインポートされました', 'success');
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                this.showNotification('データのインポートに失敗しました', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Global functions for HTML onclick handlers
function openProductModal(productId = null) {
    app.openProductModal(productId);
}

function closeProductModal() {
    app.closeProductModal();
}

function closeDeleteModal() {
    app.closeDeleteModal();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PMDashboard();
});

// Add CSS for notifications
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
