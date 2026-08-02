document.addEventListener('DOMContentLoaded', () => {
    const footerItems = document.querySelectorAll('.footer-item');
    const dashboardView = document.getElementById('dashboard-view');
    const borrowAction = document.querySelector('.action-borrow');
    const borrowFullview = document.getElementById('borrow-fullview');
    const borrowBackButton = document.getElementById('borrow-back-btn');
    const saveAction = document.querySelector('.action-save');
    const saveFullview = document.getElementById('save-fullview');
    const saveBackButton = document.getElementById('save-back-btn');
    const homeSection = document.getElementById('home-section');
    const moreSection = document.getElementById('more-section');
    const membershipSection = document.getElementById('membership-section');
    const investFullview = document.getElementById('invest-fullview');
    const financeFullview = document.getElementById('finance-fullview');
    const investAction = document.querySelector('.action-invest');
    const investBackButton = document.getElementById('invest-back-btn');
    const menuList = document.getElementById('menuList');
    const topbarHeader = document.getElementById('topbar-header');
    const topbarCompact = document.getElementById('topbar-compact');
    const supportToggle = document.getElementById('support-toggle');
    const supportPage = document.getElementById('support-page');
    const supportPageClose = document.getElementById('support-page-close');
    const transactionsToggle = document.getElementById('transactions-toggle');
    const transactionsPage = document.getElementById('transactions-page');
    const transactionsPageClose = document.getElementById('transactions-page-close');
    const profileTrigger = document.getElementById('profile-trigger');
    const profileModal = document.getElementById('profile-modal-backdrop');
    const profileModalClose = document.getElementById('profile-modal-close');
    const deleteAccountButton = document.getElementById('delete-account-btn');
    const restrictAccountButton = document.getElementById('restrict-account-btn');
    const financeTabs = document.querySelectorAll('.finance-tab');
    const financePanels = {
        'savings-panel': document.getElementById('savings-panel'),
        'loan-panel': document.getElementById('loan-panel')
    };
    const savingsTermCards = document.querySelectorAll('.savings-term-card');
    const btcAmountInput = document.getElementById('btc-amount');
    const usdValueInput = document.getElementById('usd-value');
    const convertTrigger = document.getElementById('convert-trigger');
    const convertPanel = document.getElementById('convert-panel');
    const btcConvertInput = document.getElementById('btc-convert-input');
    const convertSummary = document.getElementById('convert-summary');
    const convertedUsd = document.getElementById('converted-usd');
    const summaryTerm = document.getElementById('summary-term');
    const summaryEarnings = document.getElementById('summary-earnings');
    const summaryTotal = document.getElementById('summary-total');
    const btcAmountLoanInput = document.getElementById('btc-amount-loan');
    const usdValueLoan = document.getElementById('usd-value-loan');
    const ltvSliderLoan = document.getElementById('ltv-slider-loan');
    const ltvValueLoan = document.getElementById('ltv-value-loan');
    const loanPeriodButtons = document.querySelectorAll('.loan-period-btn');
    const calculateLoanButton = document.getElementById('calculate-loan-btn');
    const summaryCollateral = document.getElementById('summary-collateral');
    const summaryLoan = document.getElementById('summary-loan');
    const summaryInterest = document.getElementById('summary-interest');
    const summaryRepayment = document.getElementById('summary-repayment');
    let selectedDays = 360;
    let selectedApy = 15.0;
    let btcPrice = 59850;
    let selectedLoanDays = 30;
    const loanApr = 0.08;

    const formatCurrency = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const newsletterItems = [
        {
            title: 'AI Momentum Is Redefining Growth Stocks',
            category: 'Weekly Insight',
            image: 'asset/newsletter/news.png',
            excerpt: 'Markets are rewarding companies that turn AI into measurable revenue and stronger operating efficiency.',
            body: [
                'The latest rotation is favoring firms that can convert automation into earnings, not just hype.',
                'Investors are watching capital discipline, margin resilience, and cloud adoption as the clearest signs of durable outperformance.'
            ]
        },
        {
            title: 'Energy Plays Are Becoming More Strategic',
            category: 'Market Brief',
            image: 'asset/newsletter/tyu.png',
            excerpt: 'Energy names are regaining attention as supply constraints and infrastructure spending support upside.',
            body: [
                'Longer term, the sector looks increasingly tied to industrial demand and grid modernization.',
                'For cautious investors, selective exposure through established operators offers a balanced way to participate.'
            ]
        },
        {
            title: 'Defensive Positions Still Matter in Volatile Weeks',
            category: 'Portfolio Note',
            image: 'asset/newsletter/uio.png',
            excerpt: 'Defensive sectors are helping portfolios stay resilient while growth leaders continue to reset.',
            body: [
                'A diversified mix of yield, healthcare, and core consumer names can provide stability without sacrificing upside.',
                'The key is to keep exposure flexible while protecting liquidity for future opportunities.'
            ]
        }
    ];

    const newsletterGrid = document.getElementById('newsletter-grid');
    const newsletterDetail = document.getElementById('newsletter-detail');
    const newsletterDetailImage = document.getElementById('newsletter-detail-image');
    const newsletterDetailMeta = document.getElementById('newsletter-detail-meta');
    const newsletterDetailTitle = document.getElementById('newsletter-detail-title');
    const newsletterDetailExcerpt = document.getElementById('newsletter-detail-excerpt');
    const newsletterDetailContent = document.getElementById('newsletter-detail-content');
    const newsletterDetailClose = document.getElementById('newsletter-detail-close');

    if (newsletterGrid) {
        newsletterGrid.innerHTML = newsletterItems.map((item, index) => `
            <article class="newsletter-card" tabindex="0" role="button" aria-label="Read ${item.title}" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" />
                <h4>${item.title}</h4>
            </article>
        `).join('');

        newsletterGrid.querySelectorAll('.newsletter-card').forEach((card) => {
            card.addEventListener('click', () => {
                const index = Number(card.dataset.index);
                const item = newsletterItems[index];
                if (!item) {
                    return;
                }

                newsletterDetailImage.src = item.image;
                newsletterDetailImage.alt = item.title;
                newsletterDetailMeta.textContent = `${item.category} · Featured Article`;
                newsletterDetailTitle.textContent = item.title;
                newsletterDetailExcerpt.textContent = item.excerpt;
                newsletterDetailContent.innerHTML = item.body.map((paragraph) => `<p>${paragraph}</p>`).join('');

                newsletterDetail.classList.remove('hidden');
                requestAnimationFrame(() => newsletterDetail.classList.add('active'));
                newsletterDetail.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    card.click();
                }
            });
        });
    }

    const closeNewsletterDetail = () => {
        if (!newsletterDetail) {
            return;
        }

        newsletterDetail.classList.remove('active');
        newsletterDetail.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            newsletterDetail.classList.add('hidden');
        }, 220);
        document.body.classList.remove('modal-open');
    };

    if (newsletterDetailClose) {
        newsletterDetailClose.addEventListener('click', closeNewsletterDetail);
    }

    if (newsletterDetail) {
        newsletterDetail.addEventListener('click', (event) => {
            if (event.target === newsletterDetail) {
                closeNewsletterDetail();
            }
        });
    }

    const moreMenuItems = [
        { title: 'Get Nexos Business', subtitle: '', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"></path><path d="M6 20V9"></path><path d="M18 20V9"></path><path d="M9 9V6h6v3"></path><path d="M9 12h6"></path></svg>', logo: true },
        { title: 'Statements & Reports', subtitle: 'Get a statement for your Spend account or Pocket', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>' },
        { title: 'Saved Cards', subtitle: 'Manage connected cards', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h3"></path></svg>' },
        { title: 'Get Help', subtitle: 'Get support or send feedback', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.6-2.2 2.1-2.2 3.8"></path><path d="M12 17h.01"></path></svg>' },
        { title: 'Security', subtitle: 'Protect yourself from intruders', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.3 2.5 7.8 7 10 4.5-2.2 7-5.7 7-10V6z"></path><path d="M9.5 12.5 11 14l3.5-4"></path></svg>' },
        { title: 'Cashback', subtitle: 'See how much you\'ve earned.', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M6 11c1.5 0 3 .9 3 2.5S7.5 16 6 16s-3-.9-3-2.5S4.5 11 6 11Z"></path><path d="M18 11c-1.5 0-3 .9-3 2.5S16.5 16 18 16s3-.9 3-2.5S19.5 11 18 11Z"></path><path d="M7 7v4"></path><path d="M17 7v4"></path></svg>' },
        { title: 'App Themes', subtitle: 'Choose how your app looks.', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h10"></path><path d="M19 17h1"></path></svg>' },
        { title: 'Referrals', subtitle: 'Get paid when your friends join Nexos', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12h8"></path><path d="M12 8v8"></path><path d="M4 8a2 2 0 1 0 0 4"></path><path d="M20 16a2 2 0 1 0 0-4"></path><path d="M6 12a6 6 0 0 1 12 0"></path></svg>' },
        { title: 'Account Limits', subtitle: 'How much you can spend and receive', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c3.5-4 6.5-6 10-6s6.5 2 10 6c-3.5 4-6.5 6-10 6s-6.5-2-10-6Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>' },
        { title: 'Legal', subtitle: 'About our contract with you', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l5 5v13H6z"></path><path d="M15 3v5h5"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg>' }
    ];

    if (menuList) {
        menuList.innerHTML = moreMenuItems.map((item) => `
            <div class="menu-item" tabindex="0" role="button" aria-label="${item.title}">
                <div class="icon-box ${item.logo ? 'icon-logo' : ''}">${item.icon}</div>
                <div class="text-content">
                    <div class="title">${item.title}</div>
                    ${item.subtitle ? `<div class="subtitle">${item.subtitle}</div>` : ''}
                </div>
                <div class="arrow">›</div>
            </div>
        `).join('');

        menuList.querySelectorAll('.menu-item').forEach((menuItem) => {
            menuItem.addEventListener('click', () => {
                const label = menuItem.querySelector('.title')?.textContent || 'Item';
                window.alert(`Opening: ${label}`);
            });
        });
    }

    const showFinancePanel = (panelId) => {
        financeTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.target === panelId);
        });

        Object.values(financePanels).forEach((panel) => panel.classList.add('hidden'));
        const targetPanel = financePanels[panelId];
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
        }
    };

    const updateSavingsSummary = () => {
        const btcAmount = parseFloat(btcAmountInput?.value) || 0;
        const usdValue = btcAmount * btcPrice;

        if (usdValueInput) {
            usdValueInput.value = formatCurrency(usdValue);
        }

        const annualInterest = usdValue * (selectedApy / 100);
        const earnings = annualInterest * (selectedDays / 365);
        const total = usdValue + earnings;

        if (summaryTerm) {
            summaryTerm.textContent = `${selectedDays} Days`;
        }
        if (summaryEarnings) {
            summaryEarnings.textContent = formatCurrency(earnings);
        }
        if (summaryTotal) {
            summaryTotal.textContent = formatCurrency(total);
        }
    };

    savingsTermCards.forEach((card) => {
        card.addEventListener('click', () => {
            savingsTermCards.forEach((entry) => entry.classList.remove('active'));
            card.classList.add('active');
            selectedDays = Number(card.dataset.days) || 360;
            selectedApy  = Number(card.dataset.apy) || 15.0;
            updateSavingsSummary();
        });
    });

    if (btcAmountInput) {
        btcAmountInput.addEventListener('input', updateSavingsSummary);
        updateSavingsSummary();
    }

    const updateConversion = () => {
        const btcAmount = parseFloat(btcConvertInput?.value) || 0;
        const usdValue = btcAmount * btcPrice;

        if (convertedUsd) {
            convertedUsd.textContent = formatCurrency(usdValue);
        }

        if (convertSummary) {
            convertSummary.textContent = `USD value: ${formatCurrency(usdValue)}`;
        }
    };

    if (convertTrigger && convertPanel) {
        convertTrigger.addEventListener('click', () => {
            convertPanel.classList.toggle('hidden');
            if (!convertPanel.classList.contains('hidden')) {
                btcConvertInput?.focus();
                updateConversion();
            }
        });
    }

    if (btcConvertInput) {
        btcConvertInput.addEventListener('input', updateConversion);
    }

    const calculateLoanView = () => {
        const btcAmount = parseFloat(btcAmountLoanInput?.value) || 0;
        const collateralUsd = btcAmount * btcPrice;
        const ltv = parseFloat(ltvSliderLoan?.value) || 50;
        const loanAmount = collateralUsd * (ltv / 100);
        const years = selectedLoanDays / 365;
        const interest = loanAmount * loanApr * years;
        const repayment = loanAmount + interest;

        if (usdValueLoan) {
            usdValueLoan.textContent = formatCurrency(collateralUsd);
        }
        if (ltvValueLoan) {
            ltvValueLoan.textContent = `${ltv}%`;
        }
        if (summaryCollateral) {
            summaryCollateral.textContent = formatCurrency(collateralUsd);
        }
        if (summaryLoan) {
            summaryLoan.textContent = formatCurrency(loanAmount);
        }
        if (summaryInterest) {
            summaryInterest.textContent = formatCurrency(interest);
        }
        if (summaryRepayment) {
            summaryRepayment.textContent = formatCurrency(repayment);
        }
    };

    const setLoanButtonLoading = (isLoading) => {
        if (!calculateLoanButton) {
            return;
        }

        calculateLoanButton.classList.toggle('is-loading', isLoading);
        calculateLoanButton.disabled = isLoading;
        calculateLoanButton.textContent = isLoading ? 'Calculating…' : 'Calculate loan';
    };

    const updateLoanPrice = async () => {
        const endpoints = [
            'https://api.coinbase.com/v2/prices/BTC-USD/spot',
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    continue;
                }

                const data = await response.json();
                let price = null;

                if (endpoint.includes('coinbase')) {
                    price = Number(data?.data?.amount);
                } else if (endpoint.includes('coingecko')) {
                    price = Number(data?.bitcoin?.usd);
                }

                if (!Number.isNaN(price) && price > 0) {
                    btcPrice = price;
                    calculateLoanView();
                    return;
                }
            } catch (error) {
                // Keep the fallback price.
            }
        }
    };

    const openSupportPage = () => {
        if (!supportPage) {
            return;
        }

        supportPage.classList.remove('hidden');
        requestAnimationFrame(() => supportPage.classList.add('active'));
        supportPage.setAttribute('aria-hidden', 'false');
        supportToggle?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('modal-open');
    };

    const closeSupportPage = () => {
        if (!supportPage) {
            return;
        }

        supportPage.classList.remove('active');
        supportPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            supportPage.classList.add('hidden');
        }, 240);
        supportToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('modal-open');
    };

    if (supportToggle) {
        supportToggle.addEventListener('click', openSupportPage);
    }

    if (supportPageClose) {
        supportPageClose.addEventListener('click', closeSupportPage);
    }

    if (supportPage) {
        supportPage.addEventListener('click', (event) => {
            if (event.target === supportPage) {
                closeSupportPage();
            }
        });
    }

    supportPage?.querySelectorAll('.support-card').forEach((card) => {
        card.addEventListener('click', () => {
            const action = card.dataset.action;
            const messages = {
                call: 'Calling support line: +1 (800) 555-0199',
                chat: 'Opening support chat now.',
                dispute: 'Dispute status: No active disputes.',
                faq: 'Opening FAQs for common account issues.'
            };
            window.alert(messages[action] || 'Support option selected.');
            closeSupportPage();
        });
    });

    const openTransactionsPage = () => {
        if (!transactionsPage) {
            return;
        }

        transactionsPage.classList.remove('hidden');
        requestAnimationFrame(() => transactionsPage.classList.add('active'));
        transactionsPage.setAttribute('aria-hidden', 'false');
        transactionsToggle?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('modal-open');
    };

    const closeTransactionsPage = () => {
        if (!transactionsPage) {
            return;
        }

        transactionsPage.classList.remove('active');
        transactionsPage.setAttribute('aria-hidden', 'true');
        window.setTimeout(() => {
            transactionsPage.classList.add('hidden');
        }, 240);
        transactionsToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('modal-open');
    };

    if (transactionsToggle) {
        transactionsToggle.addEventListener('click', openTransactionsPage);
    }

    if (transactionsPageClose) {
        transactionsPageClose.addEventListener('click', closeTransactionsPage);
    }

    if (transactionsPage) {
        transactionsPage.addEventListener('click', (event) => {
            if (event.target === transactionsPage) {
                closeTransactionsPage();
            }
        });
    }

    const printStatementButton = document.querySelector('.transactions-print');
    if (printStatementButton) {
        printStatementButton.addEventListener('click', () => {
            window.print();
        });
    }

    const openProfileModal = () => {
        if (!profileModal) {
            return;
        }

        profileModal.classList.remove('hidden');
        profileModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeProfileModal = () => {
        if (!profileModal) {
            return;
        }

        profileModal.classList.add('hidden');
        profileModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    if (profileTrigger) {
        profileTrigger.addEventListener('click', openProfileModal);
    }

    if (profileModal) {
        profileModal.addEventListener('click', (event) => {
            if (event.target === profileModal) {
                closeProfileModal();
            }
        });
    }

    if (profileModalClose) {
        profileModalClose.addEventListener('click', closeProfileModal);
    }

    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', () => {
            const confirmed = window.confirm('Delete this account? This action cannot be undone.');
            if (confirmed) {
                window.alert('Account deletion requested.');
            }
        });
    }

    if (restrictAccountButton) {
        restrictAccountButton.addEventListener('click', () => {
            const confirmed = window.confirm('Restrict this account?');
            if (confirmed) {
                window.alert('Account restriction applied.');
            }
        });
    }

    if (btcAmountLoanInput) {
        btcAmountLoanInput.addEventListener('input', calculateLoanView);
    }
    if (ltvSliderLoan) {
        ltvSliderLoan.addEventListener('input', calculateLoanView);
    }

    loanPeriodButtons.forEach((button) => {
        button.addEventListener('click', () => {
            loanPeriodButtons.forEach((entry) => entry.classList.remove('active'));
            button.classList.add('active');
            selectedLoanDays = Number(button.dataset.days) || 30;
            calculateLoanView();
        });
    });

    if (calculateLoanButton) {
        calculateLoanButton.addEventListener('click', () => {
            setLoanButtonLoading(true);
            window.setTimeout(() => {
                calculateLoanView();
                setLoanButtonLoading(false);
            }, 700);
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!profileModal?.classList.contains('hidden')) {
                closeProfileModal();
                return;
            }

            if (!newsletterDetail?.classList.contains('hidden')) {
                closeNewsletterDetail();
                return;
            }
        }

        if (event.key === 'Enter' && document.getElementById('loan-panel')?.contains(document.activeElement)) {
            event.preventDefault();
            if (calculateLoanButton) {
                calculateLoanButton.click();
            } else {
                calculateLoanView();
            }
        }
    });

    calculateLoanView();
    updateLoanPrice();

    const showSection = (sectionId) => {
        [homeSection, moreSection, membershipSection, investFullview, financeFullview, borrowFullview, saveFullview].forEach((section) => {
            if (section) {
                section.classList.toggle('hidden', section.id !== sectionId);
            }
        });

        if (topbarHeader) {
            topbarHeader.hidden = sectionId !== 'home-section';
            topbarHeader.style.display = sectionId !== 'home-section' ? 'none' : 'flex';
        }
        if (topbarCompact) {
            topbarCompact.hidden = true;
            topbarCompact.style.display = 'none';
        }
        if (dashboardView) {
            dashboardView.hidden = sectionId !== 'home-section';
        }
        if (financeFullview) {
            financeFullview.classList.toggle('is-open', sectionId === 'finance-fullview');
        }
    };

    if (borrowAction && borrowFullview) {
        borrowAction.addEventListener('click', () => showSection('borrow-fullview'));
        borrowAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showSection('borrow-fullview');
            }
        });
    }

    if (borrowBackButton) {
        borrowBackButton.addEventListener('click', () => showSection('home-section'));
    }

    if (saveAction && saveFullview) {
        saveAction.addEventListener('click', () => showSection('save-fullview'));
        saveAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showSection('save-fullview');
            }
        });
    }

    if (saveBackButton) {
        saveBackButton.addEventListener('click', () => showSection('home-section'));
    }

    if (investAction) {
        const openInvestView = () => showSection('invest-fullview');
        investAction.addEventListener('click', openInvestView);
        investAction.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openInvestView();
            }
        });
    }

    if (investBackButton) {
        investBackButton.addEventListener('click', () => showSection('home-section'));
    }

    footerItems.forEach((item) => {
        item.addEventListener('click', () => {
            footerItems.forEach((entry) => entry.classList.remove('active'));
            item.classList.add('active');

            const selectedView = item.dataset.target || 'home';
            const shouldShowHome = selectedView === 'home';
            const shouldShowFinance = selectedView === 'finance';
            const shouldShowMore = selectedView === 'more';
            const shouldShowMembership = selectedView === 'membership';

            if (shouldShowHome) {
                showSection('home-section');
            } else if (shouldShowFinance) {
                showSection('finance-fullview');
                showFinancePanel('loan-panel');
            } else if (shouldShowMore) {
                showSection('more-section');
            } else if (shouldShowMembership) {
                showSection('membership-section');
            }
        });
    });

    financeTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            showFinancePanel(tab.dataset.target);
        });
    });

    showFinancePanel('loan-panel');

    const cards = document.querySelectorAll('.news-card');
    if (cards.length) {
        let index = 0;
        setInterval(() => {
            cards.forEach((card) => card.classList.remove('active'));
            cards[index].classList.add('active');
            index = (index + 1) % cards.length;
        }, 2200);
    }

    document.querySelectorAll('.portfolio-tag').forEach((tag) => {
        const iconMarkup = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 19V9"></path>
                <path d="M12 19V5"></path>
                <path d="M19 19v-7"></path>
                <path d="M3 19h18"></path>
            </svg>
        `;
        const text = tag.textContent.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
        tag.innerHTML = `${iconMarkup}<span class="tag-label">${text}</span>`;
    });

    document.querySelectorAll('.portfolio-filter').forEach((filter) => {
        filter.addEventListener('click', () => {
            document.querySelectorAll('.portfolio-filter').forEach((entry) => entry.classList.remove('active'));
            filter.classList.add('active');
        });
    });

    const btcPriceEl = document.getElementById('btc-price');
    if (btcPriceEl) {
        const updateBtcPrice = async () => {
            const endpoints = [
                'https://api.coinbase.com/v2/prices/BTC-USD/spot',
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
            ];

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) {
                        continue;
                    }

                    const data = await response.json();
                    let price = null;

                    if (endpoint.includes('coinbase')) {
                        price = Number(data?.data?.amount);
                    } else if (endpoint.includes('coingecko')) {
                        price = Number(data?.bitcoin?.usd);
                    }

                    if (!Number.isNaN(price) && price > 0) {
                        btcPriceEl.textContent = `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
                        return;
                    }
                } catch (error) {
                    // Try the next endpoint.
                }
            }

            btcPriceEl.textContent = 'Offline';
        };

        updateBtcPrice();
        setInterval(updateBtcPrice, 60000);
    }
});
